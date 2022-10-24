import { buildSync } from 'esbuild';

buildSync({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: ['node16.18'],
    outfile: 'dist/out.js',
  });