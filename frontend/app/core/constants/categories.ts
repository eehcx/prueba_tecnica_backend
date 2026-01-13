
// core values
export const CATEGORY_VALUES = [
    'comida',
    'transporte', 
    'entretenimiento',
    'supermercado',
    'servicios',
    'salud',
    'educación',
    'vivienda',
    'ropa',
    'tecnología',
    'otros'
] as const

export type Category = typeof CATEGORY_VALUES[number]

// elementos para UI
export const CATEGORIES = [
    { value: 'comida', label: 'Comida' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'entretenimiento', label: 'Entretenimiento' },
    { value: 'supermercado', label: 'Supermercado' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'salud', label: 'Salud' },
    { value: 'educación', label: 'Educación' },
    { value: 'vivienda', label: 'Vivienda' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'tecnología', label: 'Tecnología' },
    { value: 'otros', label: 'Otros' }
] as const
