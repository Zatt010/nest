import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoUserController } from './users-info.controller';
import { InfoUserService } from './users-info.service';
import { InfoUser } from './entities/users-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoUser])],
  controllers: [InfoUserController],
  providers: [InfoUserService],
})
export class InfoUserModule {}