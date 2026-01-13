<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import AppFooter from '../components/layout/AppFooter.vue'

const router = useRouter()
const route = useRoute()

useHead({
  title: 'Gestor de Gastos - Prueba Técnica',
  meta: [
    { 
      name: 'description', 
      content: 'Aplicación web para gestionar y controlar tus gastos diarios. Registra, edita y elimina gastos con facilidad.' 
    },
    { 
      name: 'keywords', 
      content: 'gestor de gastos, finanzas personales, administración de gastos, control financiero' 
    },
    { 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1' 
    },
    { 
      charset: 'utf-8' 
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 md:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="router.push('/')"
              class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="font-medium">Inicio</span>
            </button>
            
            <div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <button
              @click="router.push('/stats')"
              :class="[
                'flex items-center gap-2 cursor-pointer font-medium',
                route.path === '/stats' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Estadísticas</span>
            </button>
          </div>
          
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ route.path === '/' ? 'Gestión de Gastos' : 'Análisis de Datos' }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="space-y-6 p-4 md:p-6 lg:p-8">
      <slot />
      <AppFooter />
    </div>
  </div>
</template>
