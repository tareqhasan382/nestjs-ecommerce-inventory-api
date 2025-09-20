import { IsOptional, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiPropertyOptional({ type: Number, description: 'Category ID to filter by' })
  @IsOptional()
  @IsNumberString({}, { message: 'categoryId must be a number' })
  categoryId?: string;

  @ApiPropertyOptional({ type: Number, description: 'Minimum price' })
  @IsOptional()
  @IsNumberString({}, { message: 'minPrice must be a number' })
  minPrice?: string;

  @ApiPropertyOptional({ type: Number, description: 'Maximum price' })
  @IsOptional()
  @IsNumberString({}, { message: 'maxPrice must be a number' })
  maxPrice?: string;

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsNumberString({}, { message: 'page must be a number' })
  page?: string;

  @ApiPropertyOptional({ type: Number, default: 10 })
  @IsOptional()
  @IsNumberString({}, { message: 'limit must be a number' })
  limit?: string;
}
