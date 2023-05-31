import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable } from 'typeorm';
import { ManyToMany, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Games } from 'src/games/entities/game.entity';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id : number;

  @ManyToMany(()=> Games)
  @JoinTable()
  games:Games[];

  @OneToOne( () => User, {cascade:true})
  @JoinColumn()
  user:User;
}
