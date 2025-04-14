import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [AuthModule, ConfigModule.forRoot()],
})
export class ContactsModule {}
