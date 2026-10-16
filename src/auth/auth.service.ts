
import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from "bcrypt";

import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { User } from './entities/user.entity.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto

      const newUser = await this.userRepository.create({
        ...userData,
        password: hashSync(password, 10)

      })

      await this.userRepository.save(newUser)

      const { password: _, ...user } = newUser

      return {
        message: "Usuario Creado exitosamente",
        user,
        token: this.getJwtToken({ id: user.id })
      }

    } catch (err) {
      this.handelExeptions(err)
    }
  }


  async loginUser(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    })

    if (!user)
      throw new UnauthorizedException('Creadenciales invalidas')

    if (!compareSync(password, user.password))
      throw new UnauthorizedException('Creadenciales invalidas')

    return {
      message: 'Login exitoso',
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }


  private getJwtToken(payload: JwtPayload) {

    return this.jwtService.sign(payload)
  }


  private handelExeptions(err: any): never {
    this.logger.error(err)

    if (err.code === '23505') throw new BadRequestException(err.detail)

    throw new InternalServerErrorException('Error inesperado en el servidor, revisar logs')
  }

}
