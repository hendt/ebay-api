import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import bundleSize from 'rollup-plugin-bundle-size';
import virtual from '@rollup/plugin-virtual';

const pkg = require('./package.json');

const plugins = [
  bundleSize(),
  resolve({
    browser: true
  }),
  json(),
  commonjs(),
  terser({
    keep_fnames: true
  }),
]

export default [{
  input: './lib/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'eBayApi',
      exports: 'default',
      sourcemap: false,
      globals: {
        crypto: 'crypto'
      }
    },
  ],
  plugins
}, {
  input: './dist/eBayApi.js',
  output: [
    {
      file: pkg['browser:esm'],
      format: 'esm',
      exports: 'named'
    },
  ],
  context: 'window',
  plugins: [
    virtual({
      crypto: `export function createHash() { return window.crypto.createHash(...arguments); }; export function sign() { return window.crypto.sign(...arguments); };`,
    }),
    ...plugins
  ]
}]
