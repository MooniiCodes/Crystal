import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            name: 'bundler',
            entry: resolve(__dirname, 'src/main.js'),
            fileName: () => 'assets/index-game.js',
            formats: ['iife'],
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                pure_funcs: ['console.log', 'console.info'],
                // drop_console: false, // false for testing
                drop_debugger: true,
                passes: 2
            },
            mangle: true,
            format: {
                comments: false,
                beautify: false
            },
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true
            },
        },
    },
    plugins: [
        { // copy assets and the production index.html to dist and assets folder
            name: 'copy',
            closeBundle: async () => {
                const copyDir = (src, dest) => {
                    fs.mkdirSync(dest, { recursive: true });
                    for (const file of fs.readdirSync(src)) {
                        const s = resolve(src, file);
                        const d = resolve(dest, file);
                        fs.lstatSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
                    }
                };
                copyDir('assets', 'dist/assets');
                fs.copyFileSync('index-production.html', 'dist/index.html');
            }
        }
    ],
});
