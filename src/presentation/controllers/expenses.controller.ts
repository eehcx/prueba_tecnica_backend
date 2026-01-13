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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.expenseService.search(query, page, limit);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
