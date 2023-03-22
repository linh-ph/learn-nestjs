import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';
@Injectable()
export class AppService {
  private lastID = 0;
  private users: User[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  getUserById(id: number) {
    const userIf = this.users.find(user => user.id === id);
    if (userIf) {
      return userIf;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  createUser(user: CreateUserDto) {
    const newUser = {
      id: ++this.lastID,
      ...user
    }
    this.users.push(newUser);
    return newUser;
  }
}
