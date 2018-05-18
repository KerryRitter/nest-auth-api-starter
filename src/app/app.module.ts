import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'config/config.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
