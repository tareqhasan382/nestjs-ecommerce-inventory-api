import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
 
  @ApiProperty({ example: 'Tareq Hasan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'tareq@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword123' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
