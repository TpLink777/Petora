import { ValidRoles } from "../interfaces/valid-roles.interface.js";
import { Auth } from "./auth-decorator.js";

/**
 * Atajos de autorización por rol.
 *
 * Cada uno aplica autenticación JWT y exige el rol correspondiente:
 * - `SuperAdminAuth`: requiere `superAdmin`.
 * - `AdminAuth`: requiere `admin`.
 * - `UserAuth`: requiere `user`.
 *
 * @example
 * ```ts
 * @SuperAdminAuth()
 * @Get('seed')
 * runSeed() { ... }
 * ```
 */
export const Authorization = () => Auth()
export const SuperAdminAuth = () => Auth(ValidRoles.superAdmin)
export const AdminAuth = () => Auth(ValidRoles.admin)
export const UserAuth = () => Auth(ValidRoles.user)
