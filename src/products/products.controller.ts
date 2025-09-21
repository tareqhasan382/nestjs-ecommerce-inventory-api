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
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('products') 
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, type: Product })
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.create(createProductDto);;
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: result,
    };

  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters and pagination' })
  @ApiResponse({ status: 200, type: [Product] })
  async findAll(@Query() query: FilterProductDto) {
  const {
    categoryId,
    minPrice,
    maxPrice,
    page = '1',
    limit = '10',
  } = query;
    const result = await this.productsService.findAll(
    categoryId ? Number(categoryId) : undefined,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined,
    Number(page),
    Number(limit),
  );
  return {
      statusCode: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data: result,
    };

  }

@Get('search')
@ApiOperation({ summary: 'Search products by keyword (name/description)' })
@ApiQuery({ name: 'q', type: String, required: true, description: 'Search keyword' })
@ApiResponse({ status: 200, type: [Product] })
async search(@Query('q') keyword: string) {
  const result = await this.productsService.searchProducts(keyword);
  return {
    statusCode: HttpStatus.OK,
    message: 'Products retrieved successfully',
    data: result,
  };
}


  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Product })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result= await this.productsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Product with ID ${id} retrieved successfully`,
      data: result,
    };

  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result= await this.productsService.update(id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: `Product with ID ${id} updated successfully`,
      data: result,
    };

  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `result with ID ${id} deleted successfully`,
    };

  }
}
