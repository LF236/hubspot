import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [AuthModule],
})
export class ContactsModule {}
