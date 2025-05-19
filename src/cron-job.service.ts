import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  @Cron('*/30 * * * * *') 
  async pingAPI() {
    try {
      const res = await axios.get('http://localhost:3000/linha'); 
      this.logger.log(`Ping feito com status: ${res.status}`);
    } catch (error) {
      this.logger.error(`Erro ao pingar a API: ${error.message}`);
    }
  }
}
