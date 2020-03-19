import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
import strip from '@rollup/plugin-strip';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'eBayApi',
      exports: "default",
    }
  ],
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    terser(),
    strip({
      include: [/^.+\.min\.js$/],
      debugger: true,
      // functions: ['console.log', 'assert.*', 'debug', 'alert'],
      sourceMap: true
    })
  ]
};
