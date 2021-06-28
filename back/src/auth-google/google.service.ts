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
    // if (!req.email) {
    //   return 'No user from google'
    // }
    // const exUser = await this.usersRepository.findOne({
    //   userId: req.email
    // })
    // if (exUser) {
    //   return JSON.stringify(req.email);
    // }
    // await this.usersRepository.save({
    //   userId: req.email,
    //   password: null,
    // });
    // return null;
  }
}