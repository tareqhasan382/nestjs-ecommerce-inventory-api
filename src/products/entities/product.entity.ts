import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  categoryId: number; // explicit FK column

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' }) // link the column to relation
  category: Category;

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
