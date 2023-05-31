import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private carritoRepository: Repository<Carrito>,
  ) {}

  create(createCarritoDto: CreateCarritoDto) {
    const carrito = this.carritoRepository.create(createCarritoDto)
    return this.carritoRepository.save(carrito);
  }

  findAll() {
    return this.carritoRepository.find();
  }

  findOne(id: number) {
    const options: FindOneOptions<Carrito> = {
      where: { id: id },
    };
    return this.carritoRepository.findOne(options);
  }

  async update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito> {
    await this.carritoRepository.update(id, updateCarritoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const options: FindOneOptions<Carrito> = {
      where: { id: id },
    };
    const game = await this.carritoRepository.findOne(options);
    if (!game) {
      throw new Error('carrito no encontrado');
    }
    return this.carritoRepository.remove(game);
  }
}
