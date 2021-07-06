import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) { }
  async googleLogin(req) {
    return { 'signinId': req.email };

  }
}