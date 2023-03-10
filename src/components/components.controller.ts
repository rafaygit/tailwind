import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('components')
@UseInterceptors(FileInterceptor('componentsPicture'))
export class ComponentsController {
  constructor(private componentsService: ComponentsService) {}

  @Post()
  create(
    @Body() createComponentDto: CreateComponentDto,
    @UploadedFile() componentsPicture: Express.Multer.File,
  ) {
    return this.componentsService.create(createComponentDto, componentsPicture);
  }

  @Get('all')
  findAll() {
    return this.componentsService.findAll();
  }

  @Get()
  findOne(@Body('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Patch()
  update(
    @Body('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
