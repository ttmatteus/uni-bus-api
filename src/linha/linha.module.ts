import { Module } from '@nestjs/common';
import { LinhaController } from './linha.controller';
import { LinhaService } from './linha.service';

@Module({
  controllers: [LinhaController],
  providers: [LinhaService]
})
export class LinhaModule {}
