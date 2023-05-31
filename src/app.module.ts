import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { Games } from './games/entities/game.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zatt1696',
      database: 'tecweb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Games]), // Agrega todas las entidades que usarás en este módulo
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class AppModule {}
