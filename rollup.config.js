import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'eBayApi',
      exports: 'default',
      sourcemap: false,
    },
  ],
  plugins: [
    resolve({
      browser: true
    }),
    json(),
    commonjs(),
    terser({
      keep_fnames: true
    }),
  ]
};
