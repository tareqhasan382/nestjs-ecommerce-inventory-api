import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const exists = await this.categoryRepo.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new ConflictException('Category with this name already exists');
    }
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<(Category & { productCount: number })[]> {
    const categories = await this.categoryRepo.find({ relations: ['products'] });
    return categories.map((cat) => ({
      ...cat,
      productCount: cat.products.length,
    }));
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (category.products.length > 0) {
      throw new ConflictException(
        `Cannot delete Category #${id} because it has linked products`,
      );
    }
    await this.categoryRepo.remove(category);
  }
}
