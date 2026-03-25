import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function collectFiles(dir) {
	const entries = readdirSync(dir);
	const files = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stats = statSync(fullPath);
		if (stats.isDirectory()) {
			files.push(...collectFiles(fullPath));
		} else {
			files.push(fullPath);
		}
	}

	return files;
}

const playwrightConfig = readFileSync('playwright.config.ts', 'utf8');
const vitestConfig = readFileSync('vitest.config.ts', 'utf8');

assert(
	playwrightConfig.includes('timeout: 2000'),
	'Playwright test timeout must be explicitly set to 2000.'
);
assert(
	playwrightConfig.includes('expect: {\n\t\ttimeout: 2000'),
	'Playwright expect timeout must be explicitly set to 2000.'
);
assert(
	playwrightConfig.includes('maxDiffPixels: 0'),
	'Playwright screenshot tolerance must remain exactly 0.'
);

assert(vitestConfig.includes('testTimeout: 2000'), 'Vitest test timeout must be 2000.');
assert(vitestConfig.includes('hookTimeout: 2000'), 'Vitest hook timeout must be 2000.');
assert(vitestConfig.includes('teardownTimeout: 2000'), 'Vitest teardown timeout must be 2000.');

const scanFiles = [...collectFiles('tests'), 'playwright.config.ts', 'vitest.config.ts'];

for (const file of scanFiles) {
	const text = readFileSync(file, 'utf8');

	assert(!text.includes('waitForTimeout('), `waitForTimeout is banned: ${file}`);

	for (const match of text.matchAll(/(?:waitForTimeout|setTimeout|test\.setTimeout)\s*\(\s*(\d+)/g)) {
		const value = Number(match[1]);
		assert(value <= 2000, `Timeout ${value} in ${file} exceeds 2000.`);
	}

	for (const match of text.matchAll(/\b(?:timeout|testTimeout|hookTimeout|teardownTimeout)\s*:\s*(\d+)/g)) {
		const value = Number(match[1]);
		assert(value <= 2000, `Configured timeout ${value} in ${file} exceeds 2000.`);
	}
}

console.log('Testing policy verified.');
