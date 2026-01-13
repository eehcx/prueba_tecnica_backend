import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsDateString } from 'class-validator'

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsPositive()
    amount: number

    @IsString()
    @IsNotEmpty()
    category: string

    @IsOptional()
    @IsDateString()
    date?: string
}
