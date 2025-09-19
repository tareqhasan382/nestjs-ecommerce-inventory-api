import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userData = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(userData);
  }

  async findAll() {
    return await this.userRepository.find();
  }


 async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}});
  }



   async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'], // include hidden fields
    });
  }

    async updateRefreshToken(userId: number, refreshToken: string | null) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException();

    user.hashedRefreshToken = refreshToken;
    return this.userRepository.save(user);
  }

}
