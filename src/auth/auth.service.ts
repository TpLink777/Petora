
import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from "bcrypt";
import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { User } from './entities/user.entity.js';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto

      const newUser = await this.userRepository.create({
        ...userData,
        password: hashSync(password, 12)

      })

      await this.userRepository.save(newUser)

      const { password: _, ...resultUser } = newUser

      return {
        message: "Usuario Creado exitosamente",
        resultUser
      }

    } catch (err) {
      this.handelExeptions(err)
    }
  }


  async loginUser(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    })

    if ( !user )
      throw new UnauthorizedException('Creadenciales invalidas')

    if ( !compareSync(password, user.password) )
      throw new UnauthorizedException('Creadenciales invalidas')

    return {
      message: 'Login exitoso',
      user
    }

  }


  handelExeptions(err: any): never {
    this.logger.error( err )

    if ( err.code === '23505' ) throw new BadRequestException( err.detail )

    throw new InternalServerErrorException( 'Error inesperado en el servidor, revisar logs' )
  }

}
