import { ref, watch } from 'vue'
import { expenseService } from '../data/datasource/remote/expense.service'
import type { Expense } from '../core/entities/Expense'

export function useExpenses() {
    const expenses = ref<Expense[]>([])
    const total = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const page = ref(1)
    const limit = ref(10)
    const query = ref('')
    const category = ref('')

    async function fetchExpenses() {
        loading.value = true
        error.value = null

        try {
            let res
            
            if (query.value) {
                // Usar endpoint de búsqueda específico cuando hay query
                res = await expenseService.search(
                    query.value,
                    { page: page.value, limit: limit.value }
                )
            } else {
                // Usar endpoint normal con filtro de categoría (si existe)
                res = await expenseService.getAll(
                    { page: page.value, limit: limit.value },
                    {
                        category: category.value || undefined
                    }
                )
            }

            expenses.value = res.data
            total.value = res.total
        } catch (err: any) {
            error.value = err?.message || 'Error al cargar gastos'
        } finally {
            loading.value = false
        }
    }

    async function createExpense(payload: Omit<Expense, 'id'>) {
        await expenseService.create(payload)
        await fetchExpenses()
    }

    async function updateExpense(id: number, payload: Partial<Expense>) {
        await expenseService.update(id, payload)
        await fetchExpenses()
    }

    async function deleteExpense(id: number) {
        await expenseService.remove(id)
        await fetchExpenses()
    }

    // Cargar gastos inicialmente
    fetchExpenses()

    // Observar cambios en filtros y paginación
    watch([page, limit, query, category], fetchExpenses)

    return {
        expenses,
        total,
        page,
        limit,
        query,
        category,
        loading,
        error,
        fetchExpenses,
        createExpense,
        updateExpense,
        deleteExpense
    }
}
