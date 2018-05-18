import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UserService } from 'user/user.service';

import { JwtPayload } from './interfaces';
import { EncryptionService } from 'core/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService
  ) {
  }

  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'DL__GENERATE_YOUR_OWN_KEY__Ai', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }
}