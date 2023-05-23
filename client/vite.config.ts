import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

import { resolve } from 'path'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	server: {
		port: 3000
	},
	build: {
		outDir: 'build'
	},
	resolve: {
		alias: {
			'~': resolve(__dirname, 'src'),
		},
	},
})