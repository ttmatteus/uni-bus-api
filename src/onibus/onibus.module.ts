import { Module } from '@nestjs/common';
import { OnibusController } from './onibus.controller';
import { OnibusService } from './onibus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onibus } from './onibus.entity';
import { Linha } from 'src/linha/linha.entity';
import { Rota } from 'src/rota/rota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Onibus, Linha, Rota])],
  controllers: [OnibusController],
  providers: [OnibusService]
})
export class OnibusModule {}
