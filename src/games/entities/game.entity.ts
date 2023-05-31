
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  compra:boolean;
}
