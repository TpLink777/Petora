
import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from "bcrypt";

import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { User } from './entities/user.entity.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

/**
 * Servicio de autenticación.
 *
 * Contiene la lógica de negocio para registrar usuarios, validar credenciales
 * y emitir tokens JWT. Las contraseñas se almacenan hasheadas con bcrypt y
 * nunca se devuelven en las respuestas.
 */
@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')


  /**
   * @param userRepository Repositorio de TypeORM para la entidad `User`.
   * @param jwtService Servicio de NestJS para firmar y verificar tokens JWT.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }


  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * Flujo:
   * 1. Separa la contraseña del resto de los datos.
   * 2. Hashea la contraseña con bcrypt (10 rondas de sal).
   * 3. Guarda el usuario y genera un token JWT con su `id`.
   * 4. Devuelve el usuario sin la contraseña junto con el token.
   *
   * @param createUserDto Datos validados del nuevo usuario.
   * @returns Objeto con mensaje, usuario y token JWT.
   * @throws BadRequestException Si el email ya está registrado (código PostgreSQL 23505).
   * @throws InternalServerErrorException Ante cualquier otro error inesperado.
   */
  async createUser(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto

      const newUser = await this.userRepository.create({
        ...userData,
        password: hashSync(password, 10)

      })

      await this.userRepository.save(newUser)

      // Se excluye la contraseña antes de responder al cliente.
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


  /**
   * Valida las credenciales de un usuario y emite un token JWT.
   *
   * La contraseña se selecciona explícitamente porque la columna tiene
   * `select: false` en la entidad. Se compara con bcrypt y, si coincide,
   * se devuelve el usuario junto con el token.
   *
   * @param loginUserDto Email y contraseña del usuario.
   * @returns Mensaje, datos del usuario y token JWT.
   * @throws UnauthorizedException Si el usuario no existe o la contraseña es incorrecta.
   */
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


  /**
   * Firma un token JWT con el payload indicado.
   *
   * @param payload Datos a incluir en el token; actualmente solo el `id` del usuario.
   * @returns Token JWT firmado.
   */
  private getJwtToken(payload: JwtPayload) {

    return this.jwtService.sign(payload)
  }


  /**
   * Centraliza el manejo de errores de base de datos.
   *
   * Traduce el código PostgreSQL `23505` (violación de unicidad) a una
   * `BadRequestException` con el detalle del error. Cualquier otro error se
   * registra en el logger y se convierte en `InternalServerErrorException`.
   *
   * @param err Error capturado.
   * @throws Siempre lanza una excepción HTTP adecuada.
   */
  private handelExeptions(err: any): never {
    this.logger.error(err)

    if (err.code === '23505') throw new BadRequestException(err.detail)

    throw new InternalServerErrorException('Error inesperado en el servidor, revisar logs')
  }

}
