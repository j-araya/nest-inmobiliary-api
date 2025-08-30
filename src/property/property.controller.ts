import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ROLE, Roles } from 'src/auth/decorators/roles.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Roles(ROLE.AGENT)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query() query: FilterPropertyDto) {
    return this.propertyService.findAll(query);
  }
  
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Roles(ROLE.AGENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Roles(ROLE.AGENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
