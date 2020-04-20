import resolve from '@rollup/plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import alias from 'rollup-plugin-alias';
import livereload from 'rollup-plugin-livereload';
import json from 'rollup-plugin-json';
import visualizer from 'rollup-plugin-visualizer';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import babel from 'rollup-plugin-babel'

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		name: 'app',
		format: 'amd',
		dir: 'public/build/'
	},
	plugins: [
		visualizer(),
		svelte({
			dev: !production,
			/*css: css => {
				css.write('public/build/bundle.css');
			}*/
		}),
		replace({
			'process.env.ROLLUP_WATCH': process.env.ROLLUP_WATCH,
		}),
		alias({
			entries: {
				'api-client': !production
					? 'src/api/mock/index.js'
					: 'src/api/server/index.js'
			}
		}),
		resolve({
			resolve: ['.js', '.json'],
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			/*dedupe: ['svelte']*/
		}),
		commonjs(),

		!production && serve(),

		!production && livereload('public'),

		json(),

		babel({
			extensions: [ '.js', '.mjs', '.html', '.svelte' ],
			runtimeHelpers: true,
			exclude: [ 'node_modules/@babel/**','node_modules/core-js/**' ],
			presets: [
				[
				'@babel/preset-env',
				{
					targets: '> 0.25%, not dead',
					useBuiltIns: 'usage',
					corejs: 3
				}
				]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				[
				'@babel/plugin-transform-runtime',
				{
					useESModules: true
				}
				]
			]
		}),

		production && terser(),

		injectProcessEnv({
			NODE_ENV: process.env.ROLLUP_WATCH ? 'development' : 'production'
		}),
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
