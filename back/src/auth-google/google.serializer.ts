import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GoogleService } from './google.service';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(
    private readonly googleService: GoogleService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }
  serializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user);
  }
  deserializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user);
  }
  // serializeUser(user: any, done: (err: any, user: any) => void): any {
  //   done(null, user);
  // }
  // async deserializeUser(userId: any, done: (err: any, user?: any) => void) {
  //   return await this.usersRepository
  //     .findOneOrFail(
  //       {
  //         id: +email,
  //       },
  //       {
  //         select: ['userId'],
  //       },
  //     )
  //     .then((user) => {
  //       done(null, user);
  //     })
  //     .catch((error) => done(error));
  // }
}