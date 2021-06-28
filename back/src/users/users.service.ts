import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Users } from '../entities/users.entity';

// 요청, 응답에 대해서 몰라요.
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) { }

  async findById(signinId: string) {
    return this.usersRepository.findOne({
      where: { signinId },
      select: ['id', 'signinId', 'password'],
    });
  }

  async join(signinId: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.usersRepository.findOne({ where: { signinId } });
    if (user) {
      return false;
    }
    await this.usersRepository.save({
      signinId,
      password: hashedPassword,
    });
    return true;
  }

}
