import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron, { onstart } from 'vite-plugin-electron';
import jsx from '@vitejs/plugin-vue-jsx';
import { env as debugEnv } from './debug.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        jsx({
            // 禁止对象插槽语法，统一使用 vSlots
            enableObjectSlots: false,
        }),
        electron({
            main: {
                entry: 'electron/main/index.ts',
                vite: {
                    build: {
                        // For Debug
                        sourcemap: true,
                        outDir: path.resolve(__dirname, 'dist/electron/main'),
                    },
                    // Will start Electron via VSCode Debug
                    plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
                },
            },
            preload: {
                input: {
                    // You can configure multiple preload here
                    index: path.join(__dirname, 'electron/preload/index.ts'),
                },
                vite: {
                    build: {
                        // For Debug
                        sourcemap: 'inline',
                        outDir: path.resolve(__dirname, 'dist/electron/preload'),
                    },
                },
            },
            // Enables use of Node.js API in the Renderer-process
            // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
            renderer: {},
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: process.env.VSCODE_DEBUG
        ? {
              host: debugEnv.VITE_DEV_SERVER_HOSTNAME,
              port: debugEnv.VITE_DEV_SERVER_PORT,
          }
        : undefined,
    build: {
        outDir: path.resolve(__dirname, 'dist/application'),
    },
});
