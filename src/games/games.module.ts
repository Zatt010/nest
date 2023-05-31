import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Games } from './entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Games]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

