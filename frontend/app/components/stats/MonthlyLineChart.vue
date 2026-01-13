<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, type ChartData, type ChartOptions, registerables } from 'chart.js'
import type { MonthlyStat } from '../../core/types/Stats'

Chart.register(...registerables)

interface Props {
  data: MonthlyStat[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Gastos por Mes'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value)
}

function formatMonth(monthString: string): string {
  // Formato: "2026-01" -> "Ene 2026"
  const parts = monthString.split('-')
  if (parts.length < 2) return monthString
  
  const year = parts[0]
  const month = parts[1]
  if (!year || !month) return monthString
  
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  const monthIndex = parseInt(month, 10) - 1
  if (monthIndex < 0 || monthIndex >= monthNames.length) return monthString
  
  return `${monthNames[monthIndex]} ${year}`
}

function initChart() {
  if (!canvasRef.value || !props.data.length) return

  // Destruir gráfica anterior si existe
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  // Ordenar por mes
  const sortedData = [...props.data].sort((a, b) => a.month.localeCompare(b.month))
  
  const labels = sortedData.map(item => formatMonth(item.month))
  const totals = sortedData.map(item => item.total)
  const counts = sortedData.map(item => item.count)

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Total Gastado',
        data: totals,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Cantidad de Gastos',
        data: counts,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: false,
        yAxisID: 'y1'
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            const index = context.dataIndex
            
            if (value === null || value === undefined || index === undefined) {
              return label
            }
            
            if (context.datasetIndex === 0) {
              return `${label}: ${formatCurrency(value)}`
            } else {
              return `${label}: ${value} gastos`
            }
          }
        }
      },
      title: {
        display: true,
        text: props.title,
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Total (MXN)',
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          color: '#6b7280',
          callback: (value) => {
            if (value === null || value === undefined) return ''
            return formatCurrency(Number(value))
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Cantidad',
          color: '#6b7280'
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options
  })
}

// Observar cambios en los datos
watch(() => props.data, () => {
  if (props.data.length) {
    initChart()
  }
}, { deep: true })

onMounted(() => {
  if (props.data.length) {
    initChart()
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
    <div class="h-80">
      <canvas ref="canvasRef"></canvas>
    </div>
    <div v-if="!data.length" class="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
      No hay datos disponibles
    </div>
  </div>
</template>
