
import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { GetUSer, RoleProtected, AdminAuth } from './decorators/index.js';
import { AuthService } from './auth.service.js';
import { User } from './entities/user.entity.js';
import { UserRoleGuard } from './guards/user-role.guard.js';
import { ValidRoles } from './interfaces/valid-roles.interface.js';

/**
 * Controlador de autenticación.
 *
 * Expone los endpoints públicos de registro e inicio de sesión, además de
 * endpoints de prueba para verificar la protección mediante JWT y roles.
 * Todas las rutas cuelgan del prefijo global `api/petora`, por lo que la base
 * real es `/api/petora/auth`.
 */
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  /**
   * Registra un nuevo usuario.
   *
   * @param createUserDto Datos del usuario (nombre, email y contraseña).
   * @returns Mensaje de confirmación, los datos del usuario sin contraseña y su token JWT.
   */
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  /**
   * Inicia sesión con email y contraseña.
   *
   * Se responde con `200 OK` en lugar del `201 Created` que NestJS usa por
   * defecto en las peticiones POST.
   *
   * @param loginUserDto Credenciales del usuario.
   * @returns Mensaje de bienvenida, datos del usuario y token JWT.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  /**
   * Endpoint de prueba: requiere un token JWT válido.
   * Devuelve el usuario autenticado completo y, como ejemplo, su email.
   */
  @Get('testing')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUSer() user: User,
    @GetUSer('email') userEmail: string
  ) {
    return {
      user,
      userEmail,
    }
  }

  /**
   * Endpoint de prueba: requiere autenticación y rol `superAdmin`.
   * Implementado de forma explícita con `RoleProtected` y `UserRoleGuard`.
   */
  @Get('testing2')
  @RoleProtected(ValidRoles.superAdmin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUSer() user: User,
  ) {
    return {
      user
    }
  }

  /**
   * Endpoint de prueba: requiere autenticación y rol `admin`.
   * Usa el decorador compuesto `@AdminAuth()`, que combina JWT y roles.
   */
  @Get('testing3')
  @AdminAuth()
  testingPrivateRoute3(
    @GetUSer() user: User,
  ) {
    return {
      user
    }
  }
}
