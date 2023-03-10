import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('templates')
@UseInterceptors(FileInterceptor('templatesPicture'))
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  create(
    @Body() createTemplateDto: CreateTemplateDto,
    @UploadedFile() templatesPicture: Express.Multer.File,
  ) {
    return this.templatesService.create(createTemplateDto, templatesPicture);
  }

  @Get('all')
  findAll() {
    return this.templatesService.findAll();
  }

  @Get()
  findOne(@Body('id') id: number) {
    return this.templatesService.findOne(+id);
  }

  @Patch()
  update(@Body('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(+id, updateTemplateDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.templatesService.remove(+id);
  }
}
