import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(signinId: string, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail(
        {
          id: +signinId,
        },
        {
          select: ['signinId'],
        },
      )
      .then((user) => {
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
