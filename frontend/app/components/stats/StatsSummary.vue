<script setup lang="ts">
import type { StatsSummary } from '../../core/types/Stats'

interface Props {
  summary: StatsSummary
  monthCount?: number
}

withDefaults(defineProps<Props>(), {
  monthCount: 0
})

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
      Resumen General
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Gastado -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Gastado
            </p>
            <p class="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
              {{ formatCurrency(summary.totalExpenses) }}
            </p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total de Gastos -->
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-700 dark:text-green-300">
              Total de Gastos
            </p>
            <p class="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
              {{ formatNumber(summary.totalCount) }}
            </p>
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Promedio por Gasto -->
      <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-700 dark:text-purple-300">
              Promedio por Gasto
            </p>
            <p class="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
              {{ formatCurrency(summary.averagePerExpense) }}
            </p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Categoría Más Costosa -->
      <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-red-700 dark:text-red-300">
              Categoría Más Costosa
            </p>
            <p class="text-2xl font-bold text-red-900 dark:text-red-100 mt-1 capitalize">
              {{ summary.mostExpensiveCategory }}
            </p>
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Promedio Mensual -->
    <div class="mt-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Promedio Mensual
          </p>
          <p class="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {{ formatCurrency(summary.averagePerMonth) }}
          </p>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Basado en {{ monthCount }} {{ monthCount === 1 ? 'mes' : 'meses' }}
        </div>
      </div>
    </div>
  </div>
</template>
