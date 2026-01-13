<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Expense } from '../../core/entities/Expense'
import { validateExpense } from '../../core/common/validators/expenseValidator'
import { CATEGORIES } from '../../core/constants/categories'

const props = defineProps<{
    modelValue: boolean
    expense?: Expense | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'submit', payload: Omit<Expense, 'id'>): void
}>()

const form = reactive({
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().slice(0, 10)
})

const errors = ref<string | null>(null)

watch(
    () => props.expense,
    (value) => {
        if (value) {
            form.description = value.description
            form.amount = value.amount
            form.category = value.category
            form.date = value.date.slice(0, 10)
        } else {
            // Reset form when creating new
            form.description = ''
            form.amount = 0
            form.category = ''
            form.date = new Date().toISOString().slice(0, 10)
        }
    },
    { immediate: true }
)

function close() {
    emit('update:modelValue', false)
    errors.value = null
}

function submit() {
    const error = validateExpense(form)
    if (error) {
        errors.value = error
        return
    }

    emit('submit', {
        description: form.description,
        amount: form.amount,
        category: form.category,
        date: form.date
    })

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
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ expense ? 'Editar gasto' : 'Nuevo gasto' }}
                </h3>
            </div>

            <!-- Body -->
            <div class="px-6 py-4 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descripción <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.description"
                        type="text"
                        class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Ingrese la descripción"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Monto <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model.number="form.amount"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Categoría <span class="text-red-500">*</span>
                    </label>
                    <select
                        v-model="form.category"
                        class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <option value="">Seleccione una categoría</option>
                        <option 
                            v-for="cat in CATEGORIES" 
                            :key="cat.value" 
                            :value="cat.value"
                        >
                            {{ cat.label }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fecha
                    </label>
                    <input
                        v-model="form.date"
                        type="date"
                        class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <p v-if="errors" class="text-sm text-red-500 dark:text-red-400">
                    {{ errors }}
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
                    @click="submit"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 cursor-pointer"
                >
                    Guardar
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
