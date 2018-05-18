
import { Controller, Get, UseGuards, Response, Body, HttpStatus, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'user/user.entity';

import { AuthService } from './auth.service';
import { TokenRequest } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async loginUser(@Response() res: any, @Body() body: TokenRequest) {
    if (!(body && body.email && body.password)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email and password are required!' });
    }

    if (await this.authService.validateLogin(body.email, body.password) == false) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
    }

    return res.status(HttpStatus.OK).json(await this.authService.createToken(body.email));
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  jwtTest() {
    return "Hey!";
  }
}