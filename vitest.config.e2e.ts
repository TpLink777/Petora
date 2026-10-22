import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Configuración de Vitest para pruebas end-to-end.
 *
 * Es igual a la configuración unitaria, pero solo incluye archivos
 * `*.e2e-spec.ts`. Se ejecuta con `pnpm test:e2e`.
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
  },
});
