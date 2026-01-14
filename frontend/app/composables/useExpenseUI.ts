import { ref } from 'vue'
import type { Expense } from '../core/entities/Expense'

export function useExpenseUI() {
    const isFormOpen = ref(false)
    const isDeleteOpen = ref(false)
    const selectedExpense = ref<Expense | null>(null)

    function openCreate() {
        selectedExpense.value = null
        isFormOpen.value = true
    }

    function openEdit(expense: Expense) {
        selectedExpense.value = expense
        isFormOpen.value = true
    }

    function openDelete(expense: Expense) {
        selectedExpense.value = expense
        isDeleteOpen.value = true
    }

    function closeForm() {
        isFormOpen.value = false
        selectedExpense.value = null
    }

    function closeDelete() {
        isDeleteOpen.value = false
        selectedExpense.value = null
    }

    return {
        isFormOpen,
        isDeleteOpen,
        selectedExpense,
        openCreate,
        openEdit,
        openDelete,
        closeForm,
        closeDelete
    }
}
