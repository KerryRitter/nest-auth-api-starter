import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EncryptionService } from 'core/encryption.service';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly encryptionService: EncryptionService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email.toLocaleLowerCase() });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  async create(user: User, passwordUnencrypted: string): Promise<User> {
    user.email = user.email.toLocaleLowerCase();
    user.passwordHash = await this.encryptionService.encrypt(passwordUnencrypted);
    return await this.userRepository.save(user);
  }
}