import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'mysql/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'mysql-sql',
    exports: 'default'
  },
  plugins: [json(), commonjs(), terser()]
}
