import { Module } from '@nestjs/common';
import { LinhaController } from './linha.controller';
import { LinhaService } from './linha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Linha } from './linha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Linha])],
  controllers: [LinhaController],
  providers: [LinhaService]
})
export class LinhaModule {}
