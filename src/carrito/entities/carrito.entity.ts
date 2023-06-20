import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CarritoGame } from './carrito-game.entity';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.carrito)
  @JoinColumn()
  user: User;

  @ManyToMany(() => CarritoGame)
  @JoinTable()
  games: CarritoGame[];
}
