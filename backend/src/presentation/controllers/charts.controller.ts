import { Controller, Get } from '@nestjs/common';
import { ChartService } from '../../application/services/chart.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('charts')
@Controller('expenses')
export class ChartsController {
  constructor(private readonly chartService: ChartService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de gastos' })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas exitosamente' })
  getStats() {
    console.log('ChartsController.getStats() llamado');
    return this.chartService.getStats();
  }
}
