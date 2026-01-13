import { ref } from 'vue'
import { expenseService } from '../data/datasource/remote/expense.service'
import type { ExpenseStats } from '../core/types/Stats'

export function useStats() {
    const stats = ref<ExpenseStats | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchStats() {
        loading.value = true
        error.value = null

        try {
            stats.value = await expenseService.getStats()
        } catch (err: any) {
            error.value = err?.message || 'Error al cargar estadísticas'
            console.error('Error fetching stats:', err)
        } finally {
            loading.value = false
        }
    }

    // Cargar estadísticas automáticamente
    fetchStats()

    return {
        stats,
        loading,
        error,
        fetchStats
    }
}
