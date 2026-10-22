import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Configuración de Vitest para pruebas unitarias.
 *
 * - `tsconfigPaths` resuelve los alias declarados en `tsconfig.json`.
 * - `globals: true` expone `describe`, `it`, `expect`, etc. sin importarlos.
 * - `include` toma cualquier archivo `*.spec.ts` del proyecto.
 */
export default defineConfig({
  // Resolves the path aliases declared in tsconfig.json, including the ones
  // added by `nest g library`.
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
  },
});
