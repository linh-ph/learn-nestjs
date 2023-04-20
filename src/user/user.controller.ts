import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import User from '../db/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') //specifies a tag for this endpoint which is used in the Swagger UI to group endpoints by tag.
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() newUser: CreateUserDto): Promise<User> {
    return this.userService.create(newUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user information by id' }) //documents the summary of this endpoint.
  @ApiParam({ name: 'id', description: 'User id', type: 'string' }) //documents the parameters of this endpoint, in this case the email parameter.
  //documents the possible responses of this endpoint, including the status code and description.
  @ApiResponse({ status: 200, description: 'User information returned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  //The ParseIntPipe works by parsing the incoming string parameter to an integer. If the parameter cannot be parsed to an integer, the pipe will throw a BadRequestException.
  getUserById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  getByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getByEmail(email);
  }
}
