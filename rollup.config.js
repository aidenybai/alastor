import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [terser()],
  },
  {
    input: 'src/Request.js',
    output: {
      file: 'dist/Request.js',
      format: 'cjs',
    },
    plugins: [terser()],
  },
  {
    input: 'src/Response.js',
    output: {
      file: 'dist/Response.js',
      format: 'cjs',
    },
    plugins: [terser()],
  },
];
