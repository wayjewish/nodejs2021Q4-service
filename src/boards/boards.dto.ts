import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class BoardDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  columns!: ColumnDto[];
}

class ColumnDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsNumber()
  order!: number;
}
