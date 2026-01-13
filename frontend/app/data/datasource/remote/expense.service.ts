import type { Expense } from '../../../core/entities/Expense'
import type { Pagination } from '../../../core/types/Pagination'
import type { ExpenseFilters } from '../../../core/types/ExpenseFilters'
import type { ExpenseStats } from '../../../core/types/Stats'

const BASE_URL = 'http://localhost:3001/api/expenses'

export interface ExportFilters {
    category?: string
    startDate?: string
    endDate?: string
}

export const expenseService = {
    async getAll(
        pagination: Pagination,
        filters?: ExpenseFilters
    ): Promise<{ data: Expense[]; total: number }> {
        return await $fetch(BASE_URL, {
            params: {
                ...pagination,
                ...filters
            }
        })
    },

    async getById(id: number): Promise<Expense> {
        return await $fetch(`${BASE_URL}/${id}`)
    },

    async search(query: string, pagination: Pagination): Promise<{ data: Expense[]; total: number }> {
        return await $fetch(`${BASE_URL}/search`, {
        params: { query, ...pagination }
        })
    },

    async create(payload: Omit<Expense, 'id'>): Promise<Expense> {
        return await $fetch(BASE_URL, {
        method: 'POST',
        body: payload
        })
    },

    async update(
        id: number,
        payload: Partial<Omit<Expense, 'id'>>
    ): Promise<Expense> {
        return await $fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: payload
        })
    },

    async remove(id: number): Promise<void> {
        return await $fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
        })
    },

    async exportExcel(filters?: ExportFilters): Promise<void> {
        const url = `${BASE_URL}/export/excel`
        const params = new URLSearchParams()
        
        if (filters?.category) params.append('category', filters.category)
        if (filters?.startDate) params.append('startDate', filters.startDate)
        if (filters?.endDate) params.append('endDate', filters.endDate)
        
        const queryString = params.toString()
        const finalUrl = queryString ? `${url}?${queryString}` : url
        
        // Abrir en nueva ventana para descargar
        window.open(finalUrl, '_blank')
    },

    async exportPdf(filters?: { category?: string }): Promise<void> {
        const url = `${BASE_URL}/export/pdf`
        const params = new URLSearchParams()
        
        if (filters?.category) params.append('category', filters.category)
        
        const queryString = params.toString()
        const finalUrl = queryString ? `${url}?${queryString}` : url
        
        // Abrir en nueva ventana para descargar
        window.open(finalUrl, '_blank')
    },

    async getStats(): Promise<ExpenseStats> {
        return await $fetch(`${BASE_URL}/stats`)
    }
}
