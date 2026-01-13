<script setup lang="ts">
import type { Expense } from '../../core/entities/Expense'

const props = defineProps<{
    modelValue: boolean
    expense?: Expense | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm', id: number): void
}>()

function close() {
    emit('update:modelValue', false)
}

function confirmDelete() {
    if (!props.expense) return
    emit('confirm', props.expense.id)
    close()
}

// Close modal when clicking outside
function handleBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
        close()
    }
}
</script>

<template>
    <div 
        v-if="modelValue"
        class="modal-backdrop fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="handleBackdropClick"
    >
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-red-600 dark:text-red-400">
                    Eliminar gasto
                </h3>
            </div>

            <!-- Body -->
            <div class="px-6 py-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    ¿Seguro que deseas eliminar el gasto
                    <span class="font-medium text-gray-900 dark:text-gray-100">
                        "{{ expense?.description }}"
                    </span>?
                    Esta acción no se puede deshacer.
                </p>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                <button
                    @click="close"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    @click="confirmDelete"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 cursor-pointer"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    backdrop-filter: blur(4px);
}
</style>
