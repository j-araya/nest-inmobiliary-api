import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, ForbiddenException, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SearchPropertiesDto } from './dto/search-properties.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ROLE, Roles } from 'src/auth/decorators/roles.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
@Roles(ROLE.AGENT)
@Post()
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 }, // <--- Configuración para un solo archivo
    { name: 'images', maxCount: 10 },    // <--- Configuración para un array de archivos
  ], {
    storage: diskStorage({
      destination: join(process.cwd(), 'media', 'properties'), 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }),
)
async create(
  @Body() createPropertyDto: CreatePropertyDto,
  @UploadedFiles() files: { mainImage?: Express.Multer.File[], images?: Express.Multer.File[] }, // <--- El decorador cambia
  @Req() req: any
) {
  const user = req.user as { userId: number, role: ROLE };

  if (user.role === ROLE.AGENT && createPropertyDto.agentId !== user.userId) {
    throw new ForbiddenException('You can only create properties with your own agentId');
  }

  // Ahora los archivos se acceden a través del objeto 'files'
  const mainImage = files.mainImage ? files.mainImage[0] : null;
  const images = files.images || [];

  if (mainImage) {
    createPropertyDto.mainImageUrl = `/media/properties/${mainImage.filename}`;
  }
  if (images.length > 0) {
    createPropertyDto.imageUrls = images.map(img => `/media/properties/${img.filename}`);
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
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 }, // Configuración para el campo 'mainImage'
    { name: 'images', maxCount: 10 },    // Configuración para el campo 'images'
  ], {
    storage: diskStorage({
      destination: './media/properties',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }),
)
async update(
  @Param('id') id: number,
  @Body() updatePropertyDto: UpdatePropertyDto,
  @UploadedFiles() files: { mainImage?: Express.Multer.File[], images?: Express.Multer.File[] },
  @Req() req: any
) {
  const user = req.user as { userId: number, role: ROLE };

  // Si es AGENT, solo puede actualizar propiedades con su propio agentId
  if (user.role === ROLE.AGENT && updatePropertyDto.agentId !== user.userId) {
    throw new ForbiddenException('You can only update properties with your own agentId');
  }

  // Ahora los archivos se acceden a través del objeto 'files'
  const mainImage = files.mainImage ? files.mainImage[0] : null;
  const images = files.images || [];

  if (mainImage) {
    updatePropertyDto.mainImageUrl = `/media/properties/${mainImage.filename}`;
  }
  if (images && images.length > 0) {
    updatePropertyDto.imageUrls = images.map(img => `/media/properties/${img.filename}`);
  }

  return this.propertyService.update(id, updatePropertyDto);
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
