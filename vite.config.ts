import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
      ...(process.env.NODE_ENV === 'development'
        ? {
            global: {},
          }
        : {}),
    },
    plugins: [react()],
    resolve: {
      alias: {
        ...(process.env.NODE_ENV !== 'development'
          ? {
              './runtimeConfig': './runtimeConfig.browser',
            }
          : {}),
      },
    },
  };
});
