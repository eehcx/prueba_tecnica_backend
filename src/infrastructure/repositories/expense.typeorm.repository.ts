import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { ExpenseRepository } from '../../domain/ports/expense.repository'
import { Expense } from '../../domain/entities/expense.entity'
import { ExpenseEntity } from './expense.orm-entity'

@Injectable()
export class ExpenseTypeOrmRepository implements ExpenseRepository {
    constructor(
        @InjectRepository(ExpenseEntity)
        private readonly repo: Repository<ExpenseEntity>
    ) {}

    async findAll(page: number, limit: number, category?: string): Promise<[Expense[], number]> {
        const whereCondition = category ? { category: ILike(category) } : {};
        
        const [entities, total] = await this.repo.findAndCount({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: limit,
            order: { date: 'DESC' }
        });
        
        const expenses = entities.map(entity => 
            new Expense(
                entity.id,
                entity.description,
                entity.amount,
                entity.date,
                entity.category
            )
        );
        
        return [expenses, total];
    }

    async findById(id: number): Promise<Expense | null> {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity) return null;
        
        return new Expense(
            entity.id,
            entity.description,
            entity.amount,
            entity.date,
            entity.category
        );
    }

    async search(query: string, page: number, limit: number): Promise<[Expense[], number]> {
        try {
            console.log(`Searching for: "${query}", page: ${page}, limit: ${limit}`);
            const [entities, total] = await this.repo.findAndCount({
                where: { description: ILike(`%${query}%`) },
                skip: (page - 1) * limit,
                take: limit,
                order: { date: 'DESC' }
            });
            
            console.log(`Found ${entities.length} entities, total: ${total}`);
            
            const expenses = entities.map(entity => 
                new Expense(
                    entity.id,
                    entity.description,
                    entity.amount,
                    entity.date,
                    entity.category
                )
            );
            
            return [expenses, total];
        } catch (error) {
            console.error('Error in search repository method:', error);
            throw error;
        }
    }

    async create(expense: Expense): Promise<Expense> {
        const entity = this.repo.create(expense);
        const savedEntity = await this.repo.save(entity);
        
        return new Expense(
            savedEntity.id,
            savedEntity.description,
            savedEntity.amount,
            savedEntity.date,
            savedEntity.category
        );
    }

    async update(id: number, data: Partial<Expense>): Promise<Expense> {
        await this.repo.update(id, data);
        const entity = await this.findById(id);
        
        if (!entity) {
            throw new Error(`Expense with id ${id} not found after update`);
        }
        
        return entity;
    }

    async remove(id: number) {
        await this.repo.delete(id)
    }
}
