import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { RegisterUserResponse } from "../shop/interfaces/user";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: RegisterDto): Promise<RegisterUserResponse> {
    return await this.userRepository.save(user);
  }
}
