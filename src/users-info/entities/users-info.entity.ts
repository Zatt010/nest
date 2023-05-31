// infoUser.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class InfoUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profilePic: string;

  @Column()
  nombre_u: string;

  @Column()
  nombre_com: string;

  @Column()
  Fecha_N: string;

  @Column()
  ci: string;

  @OneToOne(() => User, user => user.infoUser)
  user: User;
}
