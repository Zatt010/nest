import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Carrito } from 'src/carrito/entities/carrito.entity';
@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foto: string;
  
  @Column()
  nombre: string;

  @Column()
  desarrollador: string;

  @Column()
  genero: string;

  @Column()
  plataforma: string;

  @Column()
  cantidad: number;

  @ManyToMany(() => Carrito, carrito => carrito.games)
  carritos: Carrito[];
}
