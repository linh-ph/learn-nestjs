import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'John@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '18', description: 'User age' })
  age: number;
}
