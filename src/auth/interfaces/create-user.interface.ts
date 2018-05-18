import { Role } from "user/user.entity";

export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
    role: Role;
}