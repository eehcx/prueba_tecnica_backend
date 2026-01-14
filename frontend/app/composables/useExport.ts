import { ref } from 'vue'
import { expenseService, type ExportFilters } from '../data/datasource/remote/expense.service'
import { useToast } from '#imports'

export function useExport() {
    const toast = useToast()
    const isExportingExcel = ref(false)
    const isExportingPdf = ref(false)

    function showToast(type: 'success' | 'error', title: string, message: string) {
        toast.add({
            title,
            description: message,
            icon: type === 'success' ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-circle',
            color: type === 'success' ? 'success' : 'error'
        })
    }

    async function exportExcel(filters: ExportFilters = {}) {
        try {
            isExportingExcel.value = true
            await expenseService.exportExcel(filters)
            showToast('success', 'Reporte Excel generado', 'El archivo se está descargando...')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'No se pudo generar el reporte Excel'
            showToast('error', 'Error al exportar', message)
        } finally {
            isExportingExcel.value = false
        }
    }

    async function exportPdf(filters: { category?: string } = {}) {
        try {
            isExportingPdf.value = true
            await expenseService.exportPdf(filters)
            showToast('success', 'Reporte PDF generado', 'El archivo se está descargando...')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'No se pudo generar el reporte PDF'
            showToast('error', 'Error al exportar', message)
        } finally {
            isExportingPdf.value = false
        }
    }

    return {
        isExportingExcel,
        isExportingPdf,
        exportExcel,
        exportPdf
    }
}
