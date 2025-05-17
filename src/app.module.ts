import { Module } from '@nestjs/common';

import { LinhaModule } from './linha/linha.module';
import { RotaModule } from './rota/rota.module';
import { OnibusModule } from './onibus/onibus.module';
import { SimuladorModule } from './simulador/simulador.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinhaModule, RotaModule, OnibusModule, SimuladorModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
