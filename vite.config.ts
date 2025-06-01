import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repo name for base path
const repoName = 'kyim';

export default defineConfig({
  base: `/${kyim}/`,
  plugins: [react()],
});
