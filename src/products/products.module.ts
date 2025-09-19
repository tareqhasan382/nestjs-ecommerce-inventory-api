// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [], // add later (ProductsController)
  providers: [],   // add later (ProductsService)
  exports: [TypeOrmModule],
})
export class ProductsModule {}
