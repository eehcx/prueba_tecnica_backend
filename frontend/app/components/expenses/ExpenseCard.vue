<script setup lang="ts">
import type { Expense } from '@/core/entities/Expense'

defineProps<{ expense: Expense }>()
</script>

<template>
    <UCard>
        <div class="flex justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ expense.description }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ expense.category }}</p>
            </div>

            <div class="text-right">
                <p class="font-bold text-gray-900 dark:text-gray-100">${{ expense.amount }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ new Date(expense.date).toLocaleDateString() }}
                </p>
            </div>
        </div>
    </UCard>
</template>
