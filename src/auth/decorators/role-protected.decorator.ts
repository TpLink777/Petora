import { SetMetadata } from "@nestjs/common";
import { ValidRoles } from "../interfaces/index.js";

/**
 * Clave de metadatos donde se almacenan los roles permitidos de un endpoint.
 * `UserRoleGuard` usa esta misma clave para leerlos con `Reflector`.
 */
export const META_ROLES: string = 'roles'

/**
 * Declara los roles permitidos para un endpoint.
 *
 * No aplica guards por sí solo: únicamente escribe los roles en los metadatos
 * del handler. Debe combinarse con `UserRoleGuard` o usarse a través del
 * decorador compuesto `@Auth(...)`.
 *
 * @param args Roles autorizados.
 *
 * @example
 * ```ts
 * @RoleProtected(ValidRoles.admin, ValidRoles.superAdmin)
 * @UseGuards(AuthGuard(), UserRoleGuard)
 * @Get('admin')
 * getAdminData() { ... }
 * ```
 */
export const RoleProtected = (...args: ValidRoles[] ) => {

    return SetMetadata(META_ROLES, args)
};
