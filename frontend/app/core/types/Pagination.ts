export interface Pagination {
    page: number
    limit: number
}

export interface PaginationComponentProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    disabled?: boolean
    showInfo?: boolean
}