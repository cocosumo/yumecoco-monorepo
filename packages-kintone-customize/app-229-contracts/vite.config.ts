export default {
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        desktop: 'src/app.ts', // main.ts を起点にビルドする
        
      },
      output: {
        format: 'iife', 
        dir: 'dist', // 
        entryFileNames: '[name].js',
      },
    },
  },
};