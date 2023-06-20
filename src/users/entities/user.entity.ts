import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { InfoUser } from '../../users-info/entities/users-info.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => InfoUser, { cascade: true })
  @JoinColumn()
  infoUser: InfoUser;
  @OneToOne(() => Carrito, { cascade: true })
  @JoinColumn()
  carrito: Carrito;
}