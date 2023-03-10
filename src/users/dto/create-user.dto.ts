import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
