
import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { GetUSer, RoleProtected, AdminAuth } from './decorators/index.js';
import { AuthService } from './auth.service.js';
import { User } from './entities/user.entity.js';
import { UserRoleGuard } from './guards/user-role.guard.js';
import { ValidRoles } from './interfaces/valid-roles.interface.js';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) //! estado de la solicitud => 200
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  //! Endpoint de pruebas, su uso es solo para experimentar.
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

  //! Endpoint de pruebas, su uso es solo para experimentar.
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


  //! Endpoint de pruebas, su uso es solo para experimentar.
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
