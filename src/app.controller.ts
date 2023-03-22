import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(Number(id));
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.appService.createUser(user);
  }
 
  // @Put(':id')
  // async replacePost(@Param('id') id: string, @Body() post: UpdateUserDto) {
  //   return this.appService.replacePost(Number(id), post);
  // }
 
  // @Delete(':id')
  // async deletePost(@Param('id') id: string) {
  //   this.appService.deletePost(Number(id));
  // }

}
