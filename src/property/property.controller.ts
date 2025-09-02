import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertiesDto } from './dto/search-properties.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ROLE, Roles } from 'src/auth/decorators/roles.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Roles(ROLE.AGENT)
  @Post()
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Req() req: any
  ) {
    const user = req.user as { userId: number, role: ROLE };

    // Si es AGENT, solo puede crear propiedades con su propio agentId
    if (user.role === ROLE.AGENT && createPropertyDto.agentId !== user.userId) {
      throw new ForbiddenException('You can only create properties with your own agentId');
    }

    return this.propertyService.create(createPropertyDto);
  }

  @IsPublic()
  @Get()
  async findAll(@Query() query: SearchPropertiesDto) {
    return this.propertyService.findAll(query);
  }
  
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Roles(ROLE.AGENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto, @Req() req: any) {

    const user = req.user as { userId: number, role: ROLE };
    
    // Si es AGENT, solo puede crear propiedades con su propio agentId
    if (user.role === ROLE.AGENT && updatePropertyDto.agentId !== user.userId) {
      throw new ForbiddenException('You can only update properties with your own agentId');
    }

    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Roles(ROLE.AGENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {

    
    const user = req.user as { userId: number, role: ROLE };
    
    // Si es AGENT, solo puede crear propiedades con su propio agentId
    if (user.role === ROLE.AGENT && id !== user.userId.toString()) {
      throw new ForbiddenException('You can only delete properties with your own agentId');
    }

    return this.propertyService.remove(+id);
  }
}
