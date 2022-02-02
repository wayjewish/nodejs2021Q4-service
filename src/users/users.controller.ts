import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.UsersService.findOne(id);
  }

  @Post()
  create(@Body() UserDto: UserDto) {
    return this.UsersService.create(UserDto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() UserDto: UserDto) {
    return this.UsersService.update(id, UserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }
}
