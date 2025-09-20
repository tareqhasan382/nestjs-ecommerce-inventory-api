import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter-product.dto';

@ApiTags('products') 
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters and pagination' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll(@Query() query: FilterProductDto) {
  const {
    categoryId,
    minPrice,
    maxPrice,
    page = '1',
    limit = '10',
  } = query;

  return this.productsService.findAll(
    categoryId ? Number(categoryId) : undefined,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
    Number(page),
    Number(limit),
  );
  }

@Get('search')
@ApiOperation({ summary: 'Search products by keyword (name/description)' })
@ApiQuery({ name: 'q', type: String, required: true, description: 'Search keyword' })
@ApiResponse({ status: 200, type: [Product] })
async search(@Query('q') keyword: string) {
  return this.productsService.searchProducts(keyword);
}


  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
