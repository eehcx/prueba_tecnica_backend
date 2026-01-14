<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationComponentProps } from '~/core/types/Pagination'

const props = withDefaults(defineProps<PaginationComponentProps>(), {
  disabled: false,
  showInfo: true
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const totalPages = computed(() => {
  if (props.totalItems <= 0) return 1
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const canGoPrev = computed(() => 
  !props.disabled && props.currentPage > 1 && props.totalItems > 0
)

const canGoNext = computed(() => 
  !props.disabled && props.currentPage < totalPages.value && props.totalItems > 0
)

function goPrev() {
  if (canGoPrev.value) {
    const newPage = props.currentPage - 1
    emit('update:currentPage', newPage)
  }
}

function goNext() {
  if (canGoNext.value) {
    const newPage = props.currentPage + 1
    emit('update:currentPage', newPage)
  }
}
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <div v-if="showInfo && totalItems > 0" class="px-3 py-1 text-gray-700 dark:text-gray-300">
      Página {{ currentPage }} de {{ totalPages }}
    </div>
    <div v-else-if="showInfo" class="px-3 py-1 text-gray-500 dark:text-gray-400 italic">
      Sin datos
    </div>
    
    <div class="flex items-center gap-2">
      <button
        @click="goPrev"
        :disabled="!canGoPrev"
        :aria-label="`Ir a página anterior`"
        class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        ←
      </button>
      
      <button
        @click="goNext"
        :disabled="!canGoNext"
        :aria-label="`Ir a página siguiente`"
        class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        →
      </button>
    </div>
  </div>
</template>
