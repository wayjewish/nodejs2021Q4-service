import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  findAll() {
    this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UsersService.findOne(id);
  }

  @Post()
  create(@Body() UserDto: UserDto) {
    console.log(UserDto);
    return 'This action adds a new user';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    console.log(UserDto);
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
