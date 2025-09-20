import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId } = createProductDto;

    if (!categoryId) {
      throw new BadRequestException('categoryId is required');
    }
    
    // Check if category exists
    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new BadRequestException(`Category with ID ${categoryId} does not exist`);
    }
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

async findAll(
  categoryId?: number,
  minPrice?: number,
  maxPrice?: number,
  page = 1,
  limit = 10,
): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
  const where: any = {};

  if (categoryId !== undefined) {
    where.categoryId = categoryId;
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    where.price = Between(minPrice, maxPrice);
  } else if (minPrice !== undefined) {
    where.price = MoreThanOrEqual(minPrice);
  } else if (maxPrice !== undefined) {
    where.price = LessThanOrEqual(maxPrice);
  }

  const [data, total] = await this.productRepository.findAndCount({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: { id: 'DESC' },
  });

  if (!data.length) {
    throw new NotFoundException('No products found for the given filters');
  }

  return { data, total, page, limit };
}

async searchProducts(keyword: string): Promise<Product[]> {
  if (!keyword || keyword.trim() === '') {
    throw new BadRequestException('Search query "q" is required');
  }

  const products = await this.productRepository.find({
    where: [
      { name: ILike(`%${keyword}%`) },
      { description: ILike(`%${keyword}%`) },
    ],
    relations: ['category'], 
    order: { createdAt: 'DESC' },
  });

  if (!products.length) {
    throw new NotFoundException(`No products found for keyword "${keyword}"`);
  }

  return products;
}


  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
