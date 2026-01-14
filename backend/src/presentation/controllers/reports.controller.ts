import { Controller, Get, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from '../../application/services/report.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('expenses')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get('export/excel')
  @ApiOperation({ summary: 'Exportar gastos a Excel' })
  @ApiResponse({ status: 200, description: 'Archivo Excel generado exitosamente' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Fecha de fin (YYYY-MM-DD)' })
  async exportExcel(
    @Res() res: Response,
    @Query('category') category?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const buffer = await this.reportService.generateExcel(category, startDate, endDate);
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="gastos.xlsx"',
      'Content-Length': buffer.length,
    });
    
    res.end(buffer);
  }

  @Get('export/pdf')
  @ApiOperation({ summary: 'Exportar gastos a PDF' })
  @ApiResponse({ status: 200, description: 'Archivo PDF generado exitosamente' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filtrar por categoría' })
  async exportPdf(
    @Res() res: Response,
    @Query('category') category?: string
  ) {
    const buffer = await this.reportService.generatePdf(category);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="gastos.pdf"',
      'Content-Length': buffer.length,
    });
    
    res.end(buffer);
  }
}
