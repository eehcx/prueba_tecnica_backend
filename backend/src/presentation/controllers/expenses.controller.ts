import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ExpenseService } from '../../application/services/expense.service';
import { CreateExpenseDto } from '../../application/dto/create-expense.dto';
import { UpdateExpenseDto } from '../../application/dto/update-expense.dto';

@Controller('expenses') 
export class ExpensesController {
  constructor(private readonly expenseService: ExpenseService) {} // ← Inyectar servicio

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string
  ) {
    return this.expenseService.findAll(page, limit, category);
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.expenseService.search(query, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Validar que el id sea un número válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      // Si no es un número, podría ser la ruta 'search' u otra ruta especial
      // En este caso, devolvemos un error 404
      throw new Error(`Invalid expense ID: ${id}`);
    }
    return this.expenseService.findOne(parsedId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid expense ID: ${id}`);
    }
    return this.expenseService.update(parsedId, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid expense ID: ${id}`);
    }
    return this.expenseService.remove(parsedId);
  }
}
