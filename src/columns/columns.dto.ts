import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ColumnDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsNumber()
  order!: number;

  @IsOptional()
  @IsString()
  boardId!: string | null;
}
