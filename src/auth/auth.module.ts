import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { User } from './entities/user.entity.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  imports: [

    TypeOrmModule.forFeature([User]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      },
    })

  ],
  exports: [ TypeOrmModule, JwtStrategy ]
})
export class AuthModule { }
