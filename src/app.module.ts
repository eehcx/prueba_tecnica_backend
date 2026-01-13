import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExpensesController } from './presentation/controllers/expenses.controller'
import { ChartsController } from './presentation/controllers/charts.controller'
import { ReportsController } from './presentation/controllers/reports.controller'
import { ExpenseService } from './application/services/expense.service'
import { ChartService } from './application/services/chart.service'
import { ReportService } from './application/services/report.service'
import { ExpenseTypeOrmRepository } from './infrastructure/repositories/expense.typeorm.repository'
import { ExpenseEntity } from './infrastructure/repositories/expense.orm-entity'
//import type { ExpenseRepository } from './domain/ports/expense.repository'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432, //parseInt(process.env.DB_PORT || ''),
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ExpenseEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ExpenseEntity])
  ],
  controllers: [ChartsController, ReportsController, ExpensesController],
  providers: [
    ExpenseService,
    ChartService,
    ReportService,
    {
      provide: 'ExpenseRepository',
      useClass: ExpenseTypeOrmRepository
    }
  ]
})
export class AppModule {}
