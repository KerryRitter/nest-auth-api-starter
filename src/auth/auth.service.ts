import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UserService } from 'user/user.service';
import { User } from 'user/user.entity';

import { JwtPayload } from './interfaces';
import { EncryptionService } from 'core/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService
  ) {
  }

  async validateLogin(email: string, passwordClear: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return false;
    }

    if (await this.encryptionService.compare(user.passwordHash, passwordClear) === false) {
      return false;
    }

    return true;
  }

  async createToken(email: string) {
    const user: JwtPayload = { email };
    
    const expiresIn = 3600;
    
    const accessToken = jwt.sign(user, 'DL__GENERATE_YOUR_OWN_KEY__Ai', { expiresIn });
    
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findByEmail(payload.email);
  }
}