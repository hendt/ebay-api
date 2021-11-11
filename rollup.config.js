import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
import strip from '@rollup/plugin-strip';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import stripCode from "rollup-plugin-strip-code"

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'eBayApi',
      exports: "default",
      sourcemap: true
    }
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
    strip({
      include: [/^.+\.min\.js$/],
      debugger: true,
      // functions: ['console.log', 'assert.*', 'debug', 'alert'],
      sourceMap: true,
    }),
    stripCode({
      start_comment: 'START.NODE_ONLY',
      end_comment: 'END.NODE_ONLY'
    })
  ]
};
