import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateTemplateDto {
  @IsString()
  name: string;
  @IsString()
  description: string;

  templatesPicture: string;
}
