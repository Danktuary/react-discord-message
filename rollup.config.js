import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import peerExternals from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'
import url from '@rollup/plugin-url'
import pkg from './package.json'

const plugins = [
	peerExternals(),
	postcss(),
	url(),
	svgr(),
	babel({
		babelHelpers: 'runtime',
		exclude: 'node_modules/**',
	}),
	resolve(),
	commonjs(),
]

const config = [
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'es',
				sourcemap: true,
			},
		],
		plugins,
	},
]

if (process.env.NODE_ENV === 'production') {
	config[0].plugins = [del({ targets: ['dist/*'] })].concat(...plugins)

	config.push({
		input: 'src/index.js',
		output: [
			{
				file: pkg.main.replace(/\.js$/, '.min.js'),
				format: 'umd',
				name: 'ReactDiscordMessage',
				plugins: [terser()],
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		],
		plugins: plugins.concat(replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		})),
	})
}

export default config
