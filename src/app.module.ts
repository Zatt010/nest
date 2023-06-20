import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games/games.controller';
import { InfoUserController } from './users-info/users-info.controller';
import { UserController } from './users/users.controller';
import { GamesService } from './games/games.service';
import { Games } from './games/entities/game.entity';
import { User } from './users/entities/user.entity';
import { InfoUser } from './users-info/entities/users-info.entity';
import { UserService } from './users/users.service';
import { InfoUserService } from './users-info/users-info.service';
import { CarritoController } from './carrito/carrito.controller';
import { CarritoService } from './carrito/carrito.service';
import { Carrito } from './carrito/entities/carrito.entity';
import { CarritoGame } from './carrito/entities/carrito-game.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './users/auth.service'; // Agrega la importación de AuthService

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
    JwtModule.register({
      secret: 'funca',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Games, User, InfoUser, Carrito, CarritoGame]),
  ],
  controllers: [GamesController, InfoUserController, UserController, CarritoController],
  providers: [GamesService, UserService, InfoUserService, CarritoService, AuthService], // Agrega AuthService aquí
})
export class AppModule {}
