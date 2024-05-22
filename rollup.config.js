import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import bundleSize from "rollup-plugin-bundle-size";
import virtual from "@rollup/plugin-virtual";
import alias from "@rollup/plugin-alias";

const pkg = require("./package.json");

const plugins = [
  virtual({
    crypto: `export function createHash() { throw Error('crypto.createHash is not supported in browser.'); }; export function sign() { throw Error('crypto.sign is not supported in browser.'); };`,
  }),
  bundleSize(),
  resolve({
    browser: true,
  }),
  json(),
  commonjs(),
  terser({
    keep_fnames: true,
  }),
  alias({
    entries: [
      {
        find: "crypto",
        replacement: "node:crypto",
      },
    ],
  }),
];

export default [
  {
    input: "./lib/index.js",
    output: [
      {
        file: pkg.browser,
        format: "umd",
        name: "eBayApi",
        exports: "default",
        sourcemap: false,
      },
    ],
    plugins,
  },
  {
    input: "./dist/eBayApi.js",
    output: [
      {
        file: pkg["browser:esm"],
        format: "esm",
        exports: "named",
      },
    ],
    context: "window",
    plugins,
  },
];
