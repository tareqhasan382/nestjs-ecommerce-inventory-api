import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Gaming Laptop' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Descriptions' })
  @IsOptional()
  @IsString()
  description?: string;
}
