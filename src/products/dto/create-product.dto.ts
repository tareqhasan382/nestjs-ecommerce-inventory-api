import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Gaming Laptop' })
   @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High performance laptop', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: 1500.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'https://example.com/laptop.jpg', required: false })
  @IsString()
  image?: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsNumber()
  categoryId: number;
}

