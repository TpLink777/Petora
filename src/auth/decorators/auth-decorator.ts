
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles } from '../interfaces/valid-roles.interface.js';
import { UserRoleGuard } from '../guards/user-role.guard.js';
import { RoleProtected } from './role-protected.decorator.js';

/**
 * Decorador compuesto que protege un endpoint con autenticación JWT y roles.
 *
 * Combina en una sola anotación:
 * - `RoleProtected(...roles)`: guarda los roles permitidos en los metadatos.
 * - `AuthGuard()`: exige un token JWT válido.
 * - `UserRoleGuard`: verifica que el usuario tenga alguno de los roles indicados.
 *
 * Si no se pasan roles, el endpoint solo exige estar autenticado.
 *
 * @param roles Roles permitidos para acceder al endpoint.
 * @example
 * ```ts
 * @Auth(ValidRoles.admin)
 * @Get('admin-only')
 * getAdminData() { ... }
 * ```
 */
export const Auth = (...roles: ValidRoles[]) => {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}
