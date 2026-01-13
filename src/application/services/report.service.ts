import { Injectable, Inject } from '@nestjs/common';
import type { ExpenseRepository } from '../../domain/ports/expense.repository';
import { Expense } from '../../domain/entities/expense.entity';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

@Injectable()
export class ReportService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async generateExcel(category?: string, startDate?: string, endDate?: string): Promise<Buffer> {
    // Obtener gastos (sin paginación para el reporte)
    const [expenses] = await this.expenseRepository.findAll(1, 10000, category);
    
    // Filtrar por fecha si se proporciona
    let filteredExpenses = expenses;
    if (startDate || endDate) {
      filteredExpenses = this.filterByDate(expenses, startDate, endDate);
    }

    // Crear workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Gastos');

    // Encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Descripción', key: 'description', width: 40 },
      { header: 'Monto (MXN)', key: 'amount', width: 15 },
      { header: 'Fecha', key: 'date', width: 20 },
      { header: 'Categoría', key: 'category', width: 20 },
    ];

    // Estilo para encabezados
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    // Agregar datos
    filteredExpenses.forEach(expense => {
      worksheet.addRow({
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        date: new Date(expense.date).toLocaleDateString('es-MX'),
        category: expense.category,
      });
    });

    // Formato de moneda para la columna de monto
    worksheet.getColumn('amount').numFmt = '"$"#,##0.00';

    // Agregar totales
    const totalRow = filteredExpenses.length + 2;
    worksheet.getCell(`B${totalRow}`).value = 'TOTAL:';
    worksheet.getCell(`B${totalRow}`).font = { bold: true };
    
    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    worksheet.getCell(`C${totalRow}`).value = totalAmount;
    worksheet.getCell(`C${totalRow}`).font = { bold: true };
    worksheet.getCell(`C${totalRow}`).numFmt = '"$"#,##0.00';

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generatePdf(category?: string): Promise<Buffer> {
    try {
      const [expenses] = await this.expenseRepository.findAll(1, 100, category);
      //console.log(`Se obtuvieron ${expenses.length} gastos para PDF`);
      
      // Convertir amount a número si es necesario
      const processedExpenses = expenses.map(expense => ({
        ...expense,
        amount: typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount
      }));
      
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        const doc = new PDFDocument({ margin: 50 });

        doc.on('data', chunks.push.bind(chunks));
        doc.on('end', () => {
          const buffer = Buffer.concat(chunks);
          //console.log(`PDF generado, tamaño: ${buffer.length} bytes`);
          resolve(buffer);
        });
        doc.on('error', (error) => {
          //console.error('Error en PDFDocument:', error);
          reject(error);
        });

        // Título
        doc.fontSize(20).text('Reporte de Gastos', { align: 'center' });
        doc.moveDown();
        
        if (category) {
          doc.fontSize(12).text(`Categoría: ${category}`, { align: 'center' });
          doc.moveDown();
        }

        doc.fontSize(10).text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, { align: 'right' });
        doc.moveDown(2);

        // Encabezados de tabla
        const tableTop = doc.y;
        const headers = ['ID', 'Descripción', 'Monto', 'Fecha', 'Categoría'];
        const columnWidths = [40, 200, 80, 80, 100];
        
        let x = 50;
        headers.forEach((header, i) => {
          doc.font('Helvetica-Bold').fontSize(10);
          doc.text(header, x, tableTop, { width: columnWidths[i] });
          x += columnWidths[i];
        });

        // Línea separadora
        doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();
        doc.moveDown();

        // Datos
        let y = tableTop + 30;
        processedExpenses.forEach((expense, index) => {
          if (y > 700) { // Nueva página si se llena
            doc.addPage();
            y = 50;
          }

          x = 50;
          const row = [
            expense.id.toString(),
            expense.description,
            `$${expense.amount.toFixed(2)}`,
            new Date(expense.date).toLocaleDateString('es-MX'),
            expense.category,
          ];

          doc.font('Helvetica').fontSize(9);
          row.forEach((cell, i) => {
            doc.text(cell, x, y, { width: columnWidths[i] });
            x += columnWidths[i];
          });

          y += 20;
        });

        // Total
        const totalAmount = processedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        doc.moveDown(2);
        doc.font('Helvetica-Bold').fontSize(12);
        doc.text(`Total: $${totalAmount.toFixed(2)} MXN`, 50, doc.y, { align: 'right' });

        doc.end();
      });
    } catch (error) {
      //console.error('Error en generatePdf:', error);
      throw error;
    }
  }

  private filterByDate(expenses: Expense[], startDate?: string, endDate?: string): Expense[] {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return expenseDate >= start && expenseDate <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return expenseDate >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        return expenseDate <= end;
      }
      
      return true;
    });
  }
}
