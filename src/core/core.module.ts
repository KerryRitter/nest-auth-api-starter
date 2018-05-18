import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [],
  providers: [EncryptionService],
  controllers: [],
  exports: [EncryptionService]
})
export class CoreModule {
}