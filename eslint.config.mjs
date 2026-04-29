import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['public/kiosks/**', 'tools/sources/**', '*_standalone_.html'],
  },
];

export default eslintConfig;
