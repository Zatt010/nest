import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
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

  @OneToOne( () => Carrito, {cascade:true})
  @JoinColumn()
  carrito:Carrito;

  @OneToOne(() => InfoUser, { cascade: true })
  @JoinColumn()
  infoUser: InfoUser;

  @BeforeInsert()
  async createCarrito() {
    const carrito = new Carrito();
    this.carrito = carrito;
  }
// para recuperar el carrito asociado
//   const userRepository = getRepository(User);
// const user = await userRepository.findOne({ id: userId }, { relations: ['carrito'] });

// if (user) {
//   const carrito = user.carrito;
//   console.log(carrito);
//}

}