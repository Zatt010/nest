import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './interfaces/user.interface';
import { UpdateUserDto } from './interfaces/changeUser.interface';
import { AuthService } from './auth.service';
import { Carrito } from '../carrito/entities/carrito.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
    @InjectRepository(Carrito)
    private carritoRepository: Repository<Carrito>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id },
    };
    return this.userRepository.findOne(options);
  }

  findByEmail(email: string): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { email: Like(`%${email}%`) },
    };
    return this.userRepository.findOne(options);
  }

  async findByEmailAndPassword(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const token = await this.authService.generateToken(user);
  
    return token;
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (updateUserDto.carritoId) {
      const carritoOptions: FindOneOptions<Carrito> = {
        where: { id: updateUserDto.carritoId },
      };
      const carrito = await this.carritoRepository.findOne(carritoOptions);
      if (!carrito) {
        throw new NotFoundException('Carrito not found');
      }
      user.carrito = carrito;
    }
  
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
  
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
  
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }
  
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id },
    };
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }
}
