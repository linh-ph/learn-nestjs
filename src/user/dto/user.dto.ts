import { IsEmail } from 'class-validator';

export class UserDTO {
  id: number;

  name: string;

  @IsEmail()
  email: string;

  age: number;
}
