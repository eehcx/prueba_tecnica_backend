import { Controller, Get } from '@nestjs/common';
import { ChartService } from '../../application/services/chart.service';

@Controller('expenses')
export class ChartsController {
  constructor(private readonly chartService: ChartService) {}

  @Get('stats')
  getStats() {
    console.log('ChartsController.getStats() llamado');
    return this.chartService.getStats();
  }
}
