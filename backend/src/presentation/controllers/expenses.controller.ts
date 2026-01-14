import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ExpenseService } from '../../application/services/expense.service';
import { CreateExpenseDto } from '../../application/dto/create-expense.dto';
import { UpdateExpenseDto } from '../../application/dto/update-expense.dto';
import { PaginatedResponse } from '../../application/dto/paginated-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expenses') 
export class ExpensesController {
  constructor(private readonly expenseService: ExpenseService) {} 

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gasto' })
  @ApiResponse({ status: 201, description: 'Gasto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateExpenseDto })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los gastos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de gastos paginada',
    type: PaginatedResponse 
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite por página' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filtrar por categoría' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string
  ) {
    return this.expenseService.findAll(page, limit, category);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar gastos por descripción' }) 
  @ApiResponse({ 
    status: 200, 
    description: 'Resultados de la búsqueda paginados',
    type: PaginatedResponse 
  })
  @ApiQuery({ name: 'query', required: true, type: String, description: 'Término de búsqueda' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite por página' })
  search(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.expenseService.search(query, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto encontrado' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
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
  @ApiOperation({ summary: 'Actualizar un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
  @ApiBody({ type: UpdateExpenseDto })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid expense ID: ${id}`);
    }
    return this.expenseService.update(parsedId, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
  remove(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid expense ID: ${id}`);
    }
    return this.expenseService.remove(parsedId);
  }
}
