import { Expense } from '../entities/expense.entity'

export interface ExpenseRepository {
    findAll(
        page: number,
        limit: number,
        category?: string
    ): Promise<[Expense[], number]>

    findById(id: number): Promise<Expense | null>

    search(
        query: string,
        page: number,
        limit: number
    ): Promise<[Expense[], number]>

    create(expense: Expense): Promise<Expense>

    update(id: number, expense: Partial<Expense>): Promise<Expense>

    remove(id: number): Promise<void>
}
