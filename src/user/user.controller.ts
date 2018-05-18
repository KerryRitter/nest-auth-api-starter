
import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create() {
    // let user = new User();
    // user.email = "admin@admin.com";
    // user.username = "admin";
    // user.role = Role.SuperAdmin;
    
    // return await this.userService.create(user, "Temp123!");
  }
}