import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths so the build works under any sub-path, e.g. GitHub Pages /Bartender-hub/.
  base: './',
  plugins: [react()],
});
