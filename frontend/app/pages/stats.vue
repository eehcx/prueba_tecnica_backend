<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useStats } from '../composables/useStats'
import StatsSummary from '../components/stats/StatsSummary.vue'
import CategoryBarChart from '../components/stats/CategoryBarChart.vue'
import MonthlyLineChart from '../components/stats/MonthlyLineChart.vue'

useHead({
  title: 'Estadísticas de Gastos - Gestor de Gastos',
  meta: [
    { 
      name: 'description', 
      content: 'Estadísticas detalladas y gráficas de tus gastos por categoría y mes.' 
    }
  ]
})

const { stats, loading, error, fetchStats } = useStats()

</script>

<template>
  <div class="space-y-6 p-4 md:p-6 lg:p-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Estadísticas de Gastos</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Análisis detallado de tus gastos por categoría y mes
        </p>
      </div>

      <button
        @click="fetchStats"
        :disabled="loading"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
        {{ loading ? 'Actualizando...' : 'Actualizar' }}
      </button>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-medium text-red-800 dark:text-red-300">Error al cargar estadísticas</p>
          <p class="text-sm text-red-700 dark:text-red-400 mt-1">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !stats" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div class="animate-pulse space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
        <div class="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
      </div>
    </div>

    <!-- Stats Content -->
    <div v-if="stats && !loading" class="space-y-6">
      <!-- Summary -->
      <StatsSummary 
        :summary="stats.summary" 
        :month-count="stats.byMonth.length" 
      />

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Category Chart -->
        <CategoryBarChart 
          :data="stats.byCategory" 
          title="Gastos por Categoría"
        />

        <!-- Monthly Chart -->
        <MonthlyLineChart 
          :data="stats.byMonth" 
          title="Gastos por Mes"
        />
      </div>

      <!-- Category Details Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Detalle por Categoría
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Desglose completo de gastos por categoría
          </p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Gastado
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cantidad
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Promedio
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Porcentaje
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="category in stats.byCategory" :key="category.category">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {{ category.category }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(category.total) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ category.count }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(category.average) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ ((category.total / stats.summary.totalExpenses) * 100).toFixed(1) }}%
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                  Total
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                  {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(stats.summary.totalExpenses) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                  {{ stats.summary.totalCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                  {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(stats.summary.averagePerExpense) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                  100%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !stats && !error" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No hay datos de estadísticas</h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        No se pudieron cargar las estadísticas. Intenta actualizar la página.
      </p>
      <button
        @click="fetchStats"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
        Intentar de nuevo
      </button>
    </div>
  </div>
</template>
