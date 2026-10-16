
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '../entities/user.entity.js';
import { META_ROLES } from '../decorators/role-protected.decorator.js';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())
    const req = context.switchToHttp().getRequest()
    const user = req.user as User


    if(!validRoles || validRoles.length === 0) return true

    if (!user)
      throw new InternalServerErrorException("Usuario no encontrado")

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true
      }
    }

    throw new ForbiddenException(`User ${user.fullName} need a valid role`)
  }
}
