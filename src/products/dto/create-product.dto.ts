import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Gaming Laptop' })
  name: string;

  @ApiProperty({ example: 'High performance laptop', required: false })
  description?: string;

  @ApiProperty({ example: 1500.99 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: 'https://example.com/laptop.jpg', required: false })
  image?: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  categoryId: number;
}

