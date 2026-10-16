
import { ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";


export const GetUSer = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if(!user)
            throw new InternalServerErrorException("Usuario no found")

        return !data ? user : user[data]
    }
)