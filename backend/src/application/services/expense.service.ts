import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { ExpenseRepository } from '../../domain/ports/expense.repository'
import { Expense } from '../../domain/entities/expense.entity'
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { PaginatedResponse } from '../dto/paginated-response.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async create(dto: CreateExpenseDto) {
    // Usar la fecha proporcionada o la fecha actual
    const date = dto.date ? new Date(dto.date) : new Date();
    
    const expense = new Expense(
      0,
      dto.description,
      dto.amount,
      date,
      dto.category
    )
    return this.expenseRepository.create(expense)
  }

  async findAll(
    page: number,
    limit: number,
    category?: string
  ) {
    const [data, total] = await this.expenseRepository.findAll(page, limit, category);
    const totalPages = Math.ceil(total / limit);
    return new PaginatedResponse(data, total, page, limit, totalPages);
  }

  async findOne(id: number) {
    const expense = await this.expenseRepository.findById(id)
    if (!expense) {
      throw new NotFoundException('Expense not found')
    }
    return expense
  }

  async search(query: string, page: number, limit: number) {
    console.log(`ExpenseService.search called with query: "${query}", page: ${page}, limit: ${limit}`);
    
    // Validar parámetros
    if (!query || query.trim() === '') {
      // Si la query está vacía, devolver resultados vacíos
      return new PaginatedResponse([], 0, page, limit, 0);
    }
    
    // Validar paginación
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 100)); // Limitar a 100 máximo
    
    try {
      const [data, total] = await this.expenseRepository.search(query, validPage, validLimit);
      console.log(`ExpenseService.search repository returned: ${data.length} items, total: ${total}`);
      const totalPages = Math.ceil(total / validLimit);
      return new PaginatedResponse(data, total, validPage, validLimit, totalPages);
    } catch (error) {
      console.error('Search error in ExpenseService:', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateExpenseDto) {
    // Convertir date de string a Date si está presente
    const updateData: Partial<Expense> = {};
    
    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }
    
    if (dto.amount !== undefined) {
      updateData.amount = dto.amount;
    }
    
    if (dto.category !== undefined) {
      updateData.category = dto.category;
    }
    
    if (dto.date !== undefined) {
      updateData.date = new Date(dto.date);
    }
    
    return this.expenseRepository.update(id, updateData)
  }

  async remove(id: number) {
    return this.expenseRepository.remove(id)
  }
}
