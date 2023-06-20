import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Carrito } from './carrito.entity';
import { Games } from 'src/games/entities/game.entity';

@Entity()
export class CarritoGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false }) // Agrega esta línea para el campo compra
  compra: boolean;
  @Column() // Agrega esta línea para el campo compra
  gameId: number;
  @ManyToOne(() => Carrito, carrito => carrito.games)
  carrito: Carrito;

  @ManyToOne(() => Games, game => game.carritos)
  game: Games;
}
