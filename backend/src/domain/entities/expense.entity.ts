import { ApiProperty } from '@nestjs/swagger';

export class Expense {
    @ApiProperty({ 
        example: 1,
        description: 'ID único del gasto'
    })
    readonly id: number;

    @ApiProperty({ 
        example: 'Compra de supermercado',
        description: 'Descripción del gasto'
    })
    description: string;

    @ApiProperty({ 
        example: 1250.50,
        description: 'Monto del gasto en MXN'
    })
    amount: number;

    @ApiProperty({ 
        example: '2024-01-15T14:30:00Z',
        description: 'Fecha y hora del gasto'
    })
    date: Date;

    @ApiProperty({ 
        example: 'supermercado',
        description: 'Categoría del gasto'
    })
    category: string;

    constructor(
        id: number,
        description: string,
        amount: number,
        date: Date,
        category: string
    ) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }
}

/*export class Expense {
    constructor(
        public readonly id: number,
        public description: string,
        public amount: number,
        public date: Date,
        public category: string
    ) {}
}
*/