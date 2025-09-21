import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards, HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('api/categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created', type: Category })
  async create(@Body() dto: CreateCategoryDto) {
    const result = await this.categoriesService.create(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories with product counts' })
  @ApiResponse({ status: 200, type: [Category] })
  async findAll() {
    const result = await this.categoriesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all Category successfully',
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID with products' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Category })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: `category with ID ${id} retrieved successfully`,
      data: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Category updated', type: Category })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(id, dto);
    return {
      statusCode: HttpStatus.OK,
      message: `Category with ID ${id} updated successfully`,
      data: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID (only if no products)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoriesService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `Category with ID ${id} deleted successfully`,
    };
  }
}
