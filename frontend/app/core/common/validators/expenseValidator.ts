export function validateExpense(data: {
    description?: string
    amount?: number
    category?: string
}) {
    if (!data.description) return 'La descripción es obligatoria'
    if (!data.amount || data.amount <= 0) return 'Monto inválido'
    if (!data.category) return 'La categoría es obligatoria'
    return null
}
