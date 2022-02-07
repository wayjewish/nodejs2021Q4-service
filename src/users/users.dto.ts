import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  login!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
