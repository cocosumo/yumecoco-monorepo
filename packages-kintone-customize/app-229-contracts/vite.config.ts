export default {
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