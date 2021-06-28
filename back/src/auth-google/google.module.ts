
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { GoogleController } from './google.controller';
import { GoogleSerializer } from './google.serializer';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, GoogleSerializer],
  exports: [GoogleService],
})
export class GoogleModule { }