import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games/games.controller';
import { InfoUserController } from './users-info/users-info.controller';
import { UserController } from './users/users.controller';
import { GamesService } from './games/games.service';
import { Games } from './games/entities/game.entity';
import{User}from './users/entities/user.entity';
import{InfoUser}from './users-info/entities/users-info.entity';
import { UserService } from './users/users.service';
import { InfoUserService } from './users-info/users-info.service';
import { CarritoModule } from './carrito/carrito.module';

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
    TypeOrmModule.forFeature([Games]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([InfoUser]),
    CarritoModule,
  ],
  controllers: [GamesController, InfoUserController, UserController],
  providers: [GamesService, UserService, InfoUserService],
})
export class AppModule {}
