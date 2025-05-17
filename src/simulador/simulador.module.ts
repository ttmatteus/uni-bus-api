import { Module } from '@nestjs/common';
import { SimuladorService } from './simulador.service';

@Module({
  providers: [SimuladorService]
})
export class SimuladorModule {}
