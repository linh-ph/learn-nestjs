import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDTO } from './dto/user.dto';
import { HashService } from 'src/util/hashPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map(({ id, name, email, age }) => ({ id, name, email, age }));
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      // A Promise<string> is an object that represents an asynchronous operation that will eventually return a string.
      // In contrast, a string is a plain value that represents a sequence of characters.
      /**  use the await keyword to wait for the Promise<string> to resolve and return its value.
       * function là promise là bất đồng bộ (asynchronous) thì phải await (bắt sự kiện) của nó để chuyển về string
       */
      const password = await this.hashService.hashPassword(user.password);
      const newUser = this.userRepository.create({
        ...user,
        password,
      });

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
