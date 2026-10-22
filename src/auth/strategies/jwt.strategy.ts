
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from "typeorm";

import { JwtPayload } from "../interfaces/index.js";
import { User } from "../entities/user.entity.js";

/**
 * Estrategia de autenticación JWT para Passport.
 *
 * Extrae el token del encabezado `Authorization: Bearer <token>`, lo valida
 * con `JWT_SECRET_KEY` y, si es correcto, busca al usuario en la base de datos.
 *
 * El usuario devuelto por `validate` es adjuntado automáticamente por Passport
 * a `req.user`, quedando disponible para los guards y el decorador `@GetUSer()`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     * @param userRepository Repositorio para buscar al usuario del token.
     * @param configService Servicio para leer el secreto JWT del entorno.
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('JWT_SECRET_KEY')
        })
    }

    /**
     * Valida el payload del token y resuelve el usuario autenticado.
     *
     * @param payload Contenido decodificado del JWT (incluye el `id`).
     * @returns El usuario encontrado, que Passport adjunta a `req.user`.
     * @throws UnauthorizedException Si el usuario no existe o está inactivo.
     */
    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload

        const user = await this.userRepository.findOneBy({ id })

        if (!user)
            throw new UnauthorizedException('Token invalido')

        if (!user.isActive)
            throw new UnauthorizedException('Usuario inactivo, contacta al administrador')

        return user
    }
}