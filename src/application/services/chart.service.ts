import { Injectable, Inject } from '@nestjs/common';
import type { ExpenseRepository } from '../../domain/ports/expense.repository';

@Injectable()
export class ChartService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {
  }

  async getStats() {
    try {
      console.log('ChartService.getStats() llamado');
      
      // Obtener todos los gastos (sin paginación para estadísticas)
      const [expenses] = await this.expenseRepository.findAll(1, 10000);
      //console.log(`Se obtuvieron ${expenses.length} gastos para estadísticas`);
      
      // Convertir amount a número si es necesario
      const processedExpenses = expenses.map(expense => ({
        ...expense,
        amount: typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount
      }));
      
      // Calcular estadísticas
      const byCategory = this.calculateByCategory(processedExpenses);
      const byMonth = this.calculateByMonth(processedExpenses);
      const summary = this.calculateSummary(processedExpenses, byCategory);
      
      const result = {
        byCategory,
        byMonth,
        summary,
      };
      
      //console.log('ChartService.getStats() retornando resultado:', result);
      return result;
    } catch (error) {
      //console.error('Error en ChartService.getStats():', error);
      //console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  private calculateByCategory(expenses: any[]) {
    const categoryMap = new Map<string, { total: number; count: number }>();
    
    expenses.forEach(expense => {
      const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
      const current = categoryMap.get(expense.category) || { total: 0, count: 0 };
      categoryMap.set(expense.category, {
        total: current.total + amount,
        count: current.count + 1,
      });
    });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      total: data.total,
      count: data.count,
      average: data.total / data.count,
    }));
  }

  private calculateByMonth(expenses: any[]) {
    const monthMap = new Map<string, { total: number; count: number }>();
    
    expenses.forEach(expense => {
      const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const current = monthMap.get(monthKey) || { total: 0, count: 0 };
      monthMap.set(monthKey, {
        total: current.total + amount,
        count: current.count + 1,
      });
    });

    return Array.from(monthMap.entries()).map(([month, data]) => ({
      month,
      total: data.total,
      count: data.count,
    })).sort((a, b) => a.month.localeCompare(b.month));
  }

  private calculateSummary(expenses: any[], byCategory: any[]) {
    const totalExpenses = expenses.reduce((sum, expense) => {
      const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
      return sum + amount;
    }, 0);
    const averagePerMonth = this.calculateAveragePerMonth(expenses);
    
    let mostExpensiveCategory = null;
    if (byCategory.length > 0) {
      mostExpensiveCategory = byCategory.reduce((max, category) => 
        category.total > max.total ? category : max
      ).category;
    }

    return {
      totalExpenses,
      averagePerMonth,
      mostExpensiveCategory,
      totalCount: expenses.length,
      averagePerExpense: expenses.length > 0 ? totalExpenses / expenses.length : 0,
    };
  }

  private calculateAveragePerMonth(expenses: any[]) {
    if (expenses.length === 0) return 0;
    
    const monthTotals = new Map<string, number>();
    expenses.forEach(expense => {
      const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthTotals.set(monthKey, (monthTotals.get(monthKey) || 0) + amount);
    });

    const monthlyAmounts = Array.from(monthTotals.values());
    return monthlyAmounts.reduce((sum, amount) => sum + amount, 0) / monthlyAmounts.length;
  }
}
