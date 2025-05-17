import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { LinhaModule } from './linha/linha.module';
import { RotaModule } from './rota/rota.module';
import { OnibusModule } from './onibus/onibus.module';
import { SimuladorModule } from './simulador/simulador.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
      return config.get<TypeOrmModuleOptions>('database')!;
    },
      inject: [ConfigService],
    }),
    LinhaModule, RotaModule, OnibusModule, SimuladorModule, AuthModule
  ],
})
export class AppModule {}
