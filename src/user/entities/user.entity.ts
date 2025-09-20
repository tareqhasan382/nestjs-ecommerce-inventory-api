import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ select: false })
  @ApiProperty({ description: 'Hashed password', required: false })
  password: string;

  @Column({ type: 'text', nullable: true, select: false })
  hashedRefreshToken: string | null;
}
