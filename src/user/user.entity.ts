import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  SuperAdmin = "superadmin",
  Admin = "admin",
  User = "user"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 25 })
  username: string;

  @Column({ length: 50 })
  email: string;
  
  @Column()
  passwordHash: string;
  
  @Column("varchar")
  role: Role;

  public static parse(data: Partial<User>) {
    let obj = new User();

    obj.email = data.email;
    obj.username = data.username;
    obj.role = data.role;

    return obj;
  }
}