import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: 1,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: 'http://localhost:5174',
		trace: 'off',
		contextOptions: { reducedMotion: 'reduce' },
		serviceWorkers: 'block',
		launchOptions: {
			args: [
				'--font-render-hinting=none',
				'--disable-font-subpixel-positioning',
				'--disable-lcd-text',
				'--disable-skia-runtime-opts',
				'--disable-system-font-check',
				'--disable-features=FontAccess,WebRtcHideLocalIpsWithMdns',
				'--force-device-scale-factor=1',
				'--disable-accelerated-2d-canvas',
				'--disable-gpu',
				'--use-gl=swiftshader',
				'--disable-smooth-scrolling',
				'--disable-partial-raster',
				'--no-sandbox',
				'--disable-dev-shm-usage',
				'--hide-scrollbars',
				'--force-color-profile=srgb'
			]
		},
		viewport: { width: 393, height: 852 },
		deviceScaleFactor: 1,
		timezoneId: 'America/Toronto',
		locale: 'en-CA',
		colorScheme: 'light'
	},
	snapshotPathTemplate: '{testDir}/{testFileDir}/screenshots/{arg}.png',
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5174',
		reuseExistingServer: !process.env.CI
	},
	timeout: 2000,
	expect: {
		timeout: 2000,
		toHaveScreenshot: { maxDiffPixels: 0 }
	}
});
