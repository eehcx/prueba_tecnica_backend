export class Expense {
    constructor(
        public readonly id: number,
        public description: string,
        public amount: number,
        public date: Date,
        public category: string
    ) {}
}
