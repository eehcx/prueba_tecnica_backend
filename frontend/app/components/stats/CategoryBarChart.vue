<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, type ChartData, type ChartOptions, registerables } from 'chart.js'
import type { CategoryStat } from '../../core/types/Stats'

Chart.register(...registerables)

interface Props {
  data: CategoryStat[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Gastos por Categoría'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value)
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

  // Preparar datos
  const labels = props.data.map(item => item.category)
  const totals = props.data.map(item => item.total)
  const counts = props.data.map(item => item.count)

  // Colores para las barras
  const backgroundColors = [
    'rgba(59, 130, 246, 0.7)',  // blue
    'rgba(16, 185, 129, 0.7)',  // green
    'rgba(245, 158, 11, 0.7)',  // yellow
    'rgba(239, 68, 68, 0.7)',   // red
    'rgba(139, 92, 246, 0.7)',  // purple
    'rgba(14, 165, 233, 0.7)',  // sky
    'rgba(249, 115, 22, 0.7)',  // orange
    'rgba(236, 72, 153, 0.7)',  // pink
    'rgba(20, 184, 166, 0.7)',  // teal
    'rgba(168, 85, 247, 0.7)',  // violet
  ]

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Total Gastado',
        data: totals,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }
    ]
  }

  const options: ChartOptions<'bar'> = {
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
            
            const count = counts[index] || 0
            const average = props.data[index]?.average || 0
            
            return [
              `${label}: ${formatCurrency(value)}`,
              `Cantidad: ${count} gastos`,
              `Promedio: ${formatCurrency(average)}`
            ]
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
      }
    }
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
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
