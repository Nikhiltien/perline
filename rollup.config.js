import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs(),
        css({ output: 'bundle.css' }),
        terser()
    ]
};