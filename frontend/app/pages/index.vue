<script setup lang="ts">
import { useRouter } from 'vue-router'
import ExpenseTable from '../components/expenses/ExpenseTable.vue'
import ExpenseCard from '../components/expenses/ExpenseCard.vue'
import ExpenseFormModal from '../components/expenses/ExpenseFormModal.vue'
import DeleteExpenseModal from '../components/expenses/DeleteExpenseModal.vue'
import Pagination from '../components/common/Pagination.vue'
import { useExpenses } from '../composables/useExpenses'
import { useExport } from '../composables/useExport'
import { useExpenseUI } from '../composables/useExpenseUI'
import { CATEGORIES } from '../core/constants/categories'
import type { Expense } from '../core/entities/Expense'

const router = useRouter()

const {
  expenses,
  loading,
  page,
  limit,
  total,
  query,
  category,
  createExpense,
  updateExpense,
  deleteExpense,
  error
} = useExpenses()

// UI State
const {
  isFormOpen,
  isDeleteOpen,
  selectedExpense,
  openCreate,
  openEdit,
  openDelete,
  closeForm,
  closeDelete
} = useExpenseUI()

// Export functionality
const {
  isExportingExcel,
  isExportingPdf,
  exportExcel,
  exportPdf
} = useExport()

// Submit real con API
async function handleSubmit(payload: Omit<Expense, 'id'>) {
  try {
    if (selectedExpense.value) {
      await updateExpense(selectedExpense.value.id, payload)
    } else {
      await createExpense(payload)
    }
    isFormOpen.value = false
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido al guardar gasto'
    //console.error('[handleSubmit]', message)
  }
}

// Confirm delete real con API
async function handleDelete(id: number) {
  try {
    await deleteExpense(id)
    isDeleteOpen.value = false
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido al eliminar gasto'
    //console.error('[handleDelete]', message)
  }
}

// Exportar Excel
async function handleExportExcel() {
  const filters = category.value ? { category: category.value } : {}
  await exportExcel(filters)
}

// Exportar PDF  
async function handleExportPdf() {
  const filters = category.value ? { category: category.value } : {}
  await exportPdf(filters)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:px-5">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestor de Gastos</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Administra y controla tus gastos
        </p>
      </div>

      <button
        @click="openCreate"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Nuevo gasto
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:px-5">
      <div class="relative md:w-64">
        <input
          v-model="query"
          placeholder="Buscar gasto por descripción..."
          class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          v-if="query"
          @click="query = ''"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          type="button"
          aria-label="Limpiar búsqueda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <select
        v-model="category"
        class="md:w-56 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="">Todas</option>
        <option 
          v-for="cat in CATEGORIES" 
          :key="cat.value" 
          :value="cat.value"
        >
          {{ cat.label }}
        </option>
      </select>

      <div class="flex gap-2">
        <button
          @click="handleExportExcel"
          :disabled="isExportingExcel || loading"
          class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isExportingExcel" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          {{ isExportingExcel ? 'Generando...' : 'Excel' }}
        </button>

        <button
          @click="handleExportPdf"
          :disabled="isExportingPdf || loading"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isExportingPdf" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          {{ isExportingPdf ? 'Generando...' : 'PDF' }}
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="bg-gray-50/30 dark:bg-gray-900/30 rounded-xl p-4 md:p-6">
      <!-- Desktop -->
      <div class="hidden md:block">
        <ExpenseTable
          :expenses="expenses"
          :loading="loading"
          @edit="openEdit"
          @delete="openDelete"
        />
      </div>

      <!-- Mobile -->
      <div class="md:hidden space-y-3">
        <ExpenseCard
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
          @edit="openEdit(expense)"
          @delete="openDelete(expense)"
        />
      </div>

      <!-- Empty -->
      <div
        v-if="!loading && expenses.length === 0"
        class="py-12 text-center text-gray-500 dark:text-gray-400"
      >
        No hay gastos registrados
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="page"
      :total-items="total"
      :items-per-page="limit"
      :disabled="loading"
      @update:current-page="page = $event"
    />

    <!-- Modales -->
    <ExpenseFormModal
      v-if="isFormOpen"
      v-model="isFormOpen"
      :expense="selectedExpense"
      @submit="handleSubmit"
    />

    <DeleteExpenseModal
      v-if="isDeleteOpen"
      v-model="isDeleteOpen"
      :expense="selectedExpense"
      @confirm="handleDelete"
    />
  </div>
</template>
