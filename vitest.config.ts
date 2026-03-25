import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/unit/**/*.test.ts'],
		testTimeout: 2000,
		hookTimeout: 2000,
		teardownTimeout: 2000
	}
});
