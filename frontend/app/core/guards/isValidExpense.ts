import type { Expense } from '../../core/entities/Expense';


export function isValidExpense(data: Partial<Expense>): boolean {
    return !!(
        data.description &&
        data.description.trim().length > 0 &&
        data.amount !== undefined &&
        data.amount > 0 &&
        data.category
    )
}