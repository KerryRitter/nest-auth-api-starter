
import { Controller, Get, UseGuards, Response, Body, HttpStatus, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';

import { AuthService } from './auth.service';
import { TokenRequestDto, CreateUserDto } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('token')
  async loginUser(@Response() res: any, @Body() body: TokenRequestDto) {
    if (!(body && body.email && body.password)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email and password are required!' });
    }

    if (await this.authService.validateLogin(body.email, body.password) == false) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
    }

    return res.status(HttpStatus.OK).json(await this.authService.createToken(body.email));
  }

  @Post('register')
  async registerUser(@Response() res: any, @Body() body: TokenRequestDto) {
    this.authService
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  jwtTest() {
    return "Hey!";
  }
}