import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Carrito {
@PrimaryGeneratedColumn()
Id : number
@OneToOne( () => User, {cascade:true})

Id user
Id juego 
Compra: bool
}
