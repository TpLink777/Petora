
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles } from '../interfaces/valid-roles.interface.js';
import { UserRoleGuard } from '../guards/user-role.guard.js';
import { RoleProtected } from './role-protected.decorator.js';


export const Auth = (...roles: ValidRoles[]) => {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}
