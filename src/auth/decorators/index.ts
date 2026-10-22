/**
 * Barrel de decoradores de autenticación y autorización.
 * Agrupa los atajos de roles, el decorador compuesto `Auth`, `RoleProtected`
 * y el decorador de parámetro `GetUSer`.
 */
export { AdminAuth, SuperAdminAuth, UserAuth } from "./role-auth.decorator.js";
export { Auth } from "./auth-decorator.js";
export { RoleProtected } from "./role-protected.decorator.js";
export { GetUSer } from "./get-user.decorator.js";

