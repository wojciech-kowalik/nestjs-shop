import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../shop/interfaces/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return {
      id,
      email,
    };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.password);
    await this.userRepository.save(user);

    return this.filter(user);
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }
}
