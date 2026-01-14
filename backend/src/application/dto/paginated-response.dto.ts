import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponse<T> {
    @ApiProperty({ 
        description: 'Array de datos de la página actual',
        type: [Object],
        example: []
    })
    data: T[]

    @ApiProperty({ 
        description: 'Total de registros en la base de datos',
        example: 100
    })
    total: number

    @ApiProperty({ 
        description: 'Página actual',
        example: 1
    })
    page: number

    @ApiProperty({ 
        description: 'Límite de registros por página',
        example: 10
    })
    limit: number

    @ApiProperty({ 
        description: 'Total de páginas disponibles',
        example: 10
    })
    totalPages: number

    constructor(
        data: T[],
        total: number,
        page: number,
        limit: number,
        totalPages: number
    ) {
        this.data = data
        this.total = total
        this.page = page
        this.limit = limit
        this.totalPages = totalPages
    }
}

/*
import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponse<T> {
    constructor(
        public readonly data: T[],
        public readonly total: number,
        public readonly page: number,
        public readonly limit: number,
        public readonly totalPages: number
    ) {}
}

*/