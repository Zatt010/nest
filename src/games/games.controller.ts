import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Game } from './interfaces/game.interface';
import { ChangeGame } from './interfaces/changeGame.interface';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findById(id);
  }

  @Post()
  async create(@Body() game: Game): Promise<Game> {
    return this.gamesService.create(game);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() changes: ChangeGame): Promise<Game> {
    return this.gamesService.update(id, changes);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Game> {
    return this.gamesService.delete(id);
  }
}
