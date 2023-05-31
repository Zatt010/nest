import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { InfoUser } from './entities/users-info.entity';

@Injectable()
export class InfoUserService {
  constructor(
    @InjectRepository(InfoUser)
    private infoUserRepository: Repository<InfoUser>,
  ) {}

  getInfoUserById(id: number): Promise<InfoUser> {
    const options: FindOneOptions<InfoUser> = {
        where: { id: id },
      };
    return this.infoUserRepository.findOne(options);
  }

  createInfoUser(infoUser: InfoUser): Promise<InfoUser> {
    return this.infoUserRepository.save(infoUser);
  }

  async deleteInfoUser(id: number): Promise<void> {
    await this.infoUserRepository.delete(id);
  }
}