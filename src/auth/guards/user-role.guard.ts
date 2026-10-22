
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '../entities/user.entity.js';
import { META_ROLES } from '../decorators/role-protected.decorator.js';

/**
 * Guard de autorización basado en roles.
 *
 * Se ejecuta después de la autenticación (por ejemplo, después del `AuthGuard('jwt')`),
 * por lo que espera que la petición ya tenga adjunto el usuario autenticado en `req.user`.
 *
 * Su responsabilidad es comparar los roles que el usuario posee contra los roles
 * permitidos para el endpoint. Los roles permitidos se declaran con el decorador
 * `@RoleProtected(...)` y se leen desde los metadatos del handler mediante `Reflector`.
 *
 * Flujo de decisión:
 * 1. Obtiene los roles permitidos definidos con `@RoleProtected(...)`.
 * 2. Obtiene el usuario autenticado desde `req.user`.
 * 3. Si no hay usuario, lanza `InternalServerErrorException` (el guard se usó sin autenticación previa).
 * 4. Si el endpoint no declara roles, permite el acceso a cualquier usuario autenticado.
 * 5. Si el usuario tiene al menos uno de los roles permitidos, permite el acceso.
 * 6. En caso contrario, lanza `ForbiddenException`.
 *
 * @example
 * ```ts
 * @RoleProtected(ValidRoles.admin)
 * @UseGuards(AuthGuard('jwt'), UserRoleGuard)
 * @Get('private')
 * getPrivateRoute() { ... }
 * ```
 */
@Injectable()
export class UserRoleGuard implements CanActivate {

  /**
   * @param reflector Utilidad de NestJS para leer metadatos (por ejemplo, los roles
   * definidos con `@RoleProtected`) desde el controlador o el handler.
   */
  constructor(
    private readonly reflector: Reflector
  ) { }

  /**
   * Determina si la petición actual puede continuar según los roles del usuario.
   *
   * @param context Contexto de ejecución de NestJS; se usa para acceder al handler
   * actual (para leer sus metadatos) y a la petición HTTP (`req.user`).
   * @returns `true` si el acceso está permitido. En caso contrario lanza una excepción
   * (`InternalServerErrorException` o `ForbiddenException`) que NestJS traduce a una
   * respuesta HTTP de error.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Roles permitidos declarados en el endpoint con @RoleProtected(...)
    // Si el endpoint no usa el decorador, este valor será undefined.
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    // Usuario autenticado previamente adjuntado a la petición (normalmente por la JwtStrategy).
    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    // Si no existe usuario, el guard se aplicó sin un guard de autenticación previo.
    // Es un error de configuración del servidor, no del cliente.
    if (!user)
      throw new InternalServerErrorException("Usuario no encontrado")

    // Si el endpoint no declara roles, solo se exige estar autenticado.
    if(!validRoles || validRoles.length === 0) return true

    // Basta con que el usuario tenga uno de los roles permitidos.
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true
      }
    }

    // El usuario está autenticado, pero no posee ningún rol autorizado.
    throw new ForbiddenException(`User ${user.fullName} need a valid role`)
  }
}
