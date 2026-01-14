<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import AppFooter from '../components/layout/AppFooter.vue'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div class="flex items-center justify-between">
          <!-- Logo / Brand -->
          <div class="flex items-center gap-2">
            <button
              @click="navigateTo('/')"
              class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="font-medium hidden md:inline">Gestor</span>
            </button>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-6">
            <div class="flex items-center gap-4">
              <button
                @click="navigateTo('/')"
                :class="[
                  'flex items-center gap-2 cursor-pointer font-medium',
                  route.path === '/' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Inicio</span>
              </button>
              
              <div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              
              <button
                @click="navigateTo('/stats')"
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
            
            <div class="text-sm text-gray-500 dark:text-gray-400 hidden lg:inline">
              {{ route.path === '/' ? 'Gestión de Gastos' : 'Análisis de Datos' }}
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex items-center gap-4 md:hidden">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ route.path === '/' ? 'Gastos' : 'Estadísticas' }}
            </div>
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Toggle menu"
            >
              <svg 
                v-if="!isMobileMenuOpen" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden mt-4 pb-3 border-t border-gray-200 dark:border-gray-700 pt-4"
        >
          <div class="flex flex-col space-y-4">
            <button
              @click="navigateTo('/')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-lg text-left font-medium',
                route.path === '/' 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Inicio</span>
            </button>
            
            <button
              @click="navigateTo('/stats')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-lg text-left font-medium',
                route.path === '/stats' 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Estadísticas</span>
            </button>
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
