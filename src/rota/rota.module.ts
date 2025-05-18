import { Module } from '@nestjs/common';
import { RotaController } from './rota.controller';
import { RotaService } from './rota.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rota } from './rota.entity';
import { Linha } from 'src/linha/linha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rota, Linha])],
  controllers: [RotaController],
  providers: [RotaService]
})
export class RotaModule {}
