import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsDateString } from 'class-validator'

export class CreateExpenseDto {
    @ApiProperty({ description: 'Descripción del gasto', example: 'Compra de alimentos' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ description: 'Monto del gasto', example: 150.75 })
    @IsNumber()
    @IsPositive()
    amount: number

    @ApiProperty({ description: 'Categoría del gasto', example: 'Comida' })
    @IsString()
    @IsNotEmpty()
    category: string

    @ApiProperty({ description: 'Fecha del gasto en formato ISO 8601', example: '2024-06-15T14:30:00Z', required: false })
    @IsOptional()
    @IsDateString()
    date?: string
}
