import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './interfaces/user.interface';
import {UpdateUserDto} from './interfaces/changeUser.interface'
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }
}