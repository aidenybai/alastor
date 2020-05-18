import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/Request.ts',
    output: {
      file: 'dist/Request.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/Response.ts',
    output: {
      file: 'dist/Response.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
];
