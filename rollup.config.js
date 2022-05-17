import typescript from '@rollup/plugin-typescript';

const react = {
  input: 'src/react/index.ts',
  output: {
    dir: 'react',
    format: 'es',
  },
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.react.json',
    }),
  ],
};

const main = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};

export default [main, react];
