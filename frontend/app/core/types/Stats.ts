export interface CategoryStat {
  category: string
  total: number
  count: number
  average: number
}

export interface MonthlyStat {
  month: string
  total: number
  count: number
}

export interface StatsSummary {
  totalExpenses: number
  averagePerMonth: number
  mostExpensiveCategory: string
  totalCount: number
  averagePerExpense: number
}

export interface ExpenseStats {
  byCategory: CategoryStat[]
  byMonth: MonthlyStat[]
  summary: StatsSummary
}
