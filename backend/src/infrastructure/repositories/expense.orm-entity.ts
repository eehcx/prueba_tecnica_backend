import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('expenses')
export class ExpenseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    description: string

    @Column('numeric', { precision: 10, scale: 2 })
    amount: number

    @CreateDateColumn()
    date: Date

    @Column({ length: 50 })
    category: string
}
