import { defineConfig, loadEnv  } from 'vite';


export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd());
  return {
    build: {
      target: 'es2021',
      rollupOptions: {
        input: {
          desktop: 'src/app.ts',
        },
        output: {
          format: 'iife',
          dir: 'dist',
          entryFileNames: '[name].js',
        },
      },
    },
  };

});