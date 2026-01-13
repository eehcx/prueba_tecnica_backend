import { Controller, Get, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from '../../application/services/report.service';

@Controller('expenses')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get('export/excel')
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
