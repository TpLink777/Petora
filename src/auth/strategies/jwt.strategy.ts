
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from "typeorm";

import { JwtPayload } from "../interfaces/index.js";
import { User } from "../entities/user.entity.js";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

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