import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map(({ id, name, email, age }) => ({ id, name, email, age }));
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      console.log('new users:', newUser);
      await this.userRepository.save(user);

      return newUser;
    } catch (errorMessage) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errorMessage,
          cause: new Error('Create User Error'),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByEmail(email: string) {
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      return user;
    }

    throw new HttpException('Loi roi may', HttpStatus.NO_CONTENT);
  }

  async getUserById(id: number) {
    const user: User = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
