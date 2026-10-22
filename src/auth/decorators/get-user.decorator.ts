
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

/**
 * Decorador de parámetro para obtener el usuario autenticado desde `req.user`.
 *
 * El usuario es colocado en la petición por Passport después de validar el JWT.
 *
 * @param data Opcional. Nombre de una propiedad del usuario que se quiera
 * extraer (por ejemplo, `'email'`). Si se omite, devuelve el usuario completo.
 * @throws InternalServerErrorException Si no hay usuario en la petición, lo que
 * indica que el endpoint se usó sin un guard de autenticación previo.
 *
 * @example
 * ```ts
 * @Get('profile')
 * @UseGuards(AuthGuard())
 * getProfile(@GetUSer() user: User) { ... }
 *
 * @Get('email')
 * @UseGuards(AuthGuard())
 * getEmail(@GetUSer('email') email: string) { ... }
 * ```
 */
export const GetUSer = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if(!user)
            throw new InternalServerErrorException("Usuario no found")

        return !data ? user : user[data]
    }
)