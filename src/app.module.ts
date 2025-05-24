import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import databaseConfig from './config/database.config';
import { LinhaModule } from './linha/linha.module';
import { RotaModule } from './rota/rota.module';
import { OnibusModule } from './onibus/onibus.module';
import { CronJobService } from './cron-job.service';
import { UserModule } from './user/user.module';
import { FavoritoModule } from './favorito/favorito.module';

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
    ScheduleModule.forRoot(), 
    LinhaModule,
    RotaModule,
    OnibusModule,
    UserModule,
    FavoritoModule,
  ],
   providers: [CronJobService],
})
export class AppModule {}
