import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get('all')
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get()
  findOne(@Body('id') id: string) {
    return this.subCategoryService.findOne(+id);
  }

  @Patch()
  update(
    @Body('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(+id, updateSubCategoryDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.subCategoryService.remove(+id);
  }
}
