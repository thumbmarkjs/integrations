import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom', '@thumbmarkjs/thumbmarkjs'], // Important!
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        resolveJsonModule: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: (id) => {
      // Mark all dependencies as external - don't bundle anything
      // But allow local files (starting with . or /) and JSON files to be bundled
      if (id.startsWith('.') || id.startsWith('/') || id.endsWith('.json')) {
        return false;
      }
      return true;
    },
  },
];

export default config;