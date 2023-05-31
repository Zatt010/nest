import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './interfaces/game.interface';
import { ChangeGame } from './interfaces/changeGame.interface';
import { Games } from './entities/game.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games)
    private readonly gamesRepository: Repository<Games>,
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async findById(id: number): Promise<Game> {
    const options: FindOneOptions<Games> = {
      where: { id: id },
    };
    return this.gamesRepository.findOne(options);
  }
  

  async create(game: Game): Promise<Game> {
    const newGame = this.gamesRepository.create(game);
    return this.gamesRepository.save(newGame);
  }

  async update(id: number, changes: ChangeGame): Promise<Game> {
    const options: FindOneOptions<Games> = {
      where: { id: id },
    };
    const game = await this.gamesRepository.findOne(options);
    if (!game) {
      throw new Error('Juego no encontrado');
    }
    Object.assign(game, changes);
    return this.gamesRepository.save(game);
  }

  async delete(id: number): Promise<Game> {
    const options: FindOneOptions<Games> = {
      where: { id: id },
    };
    const game = await this.gamesRepository.findOne(options);
    if (!game) {
      throw new Error('Juego no encontrado');
    }
    return this.gamesRepository.remove(game);
  }
}
