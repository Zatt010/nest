import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { InfoUserService } from './users-info.service';
import { InfoUser } from './entities/users-info.entity';

@Controller('infoUsers')
export class InfoUserController {
  constructor(private infoUserService: InfoUserService) {}

  @Get(':id')
  getInfoUserById(@Param('id') id: string): Promise<InfoUser> {
    return this.infoUserService.getInfoUserById(parseInt(id, 10));
  }

  @Post()
  createInfoUser(@Body() infoUser: InfoUser): Promise<InfoUser> {
    return this.infoUserService.createInfoUser(infoUser);
  }

  @Delete(':id')
  deleteInfoUser(@Param('id') id: string): Promise<void> {
    return this.infoUserService.deleteInfoUser(parseInt(id, 10));
  }
}