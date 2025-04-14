import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactsModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..' ,'front', 'dist'),
      exclude: ['/api*'],
    })
  ],
})
export class AppModule { }
