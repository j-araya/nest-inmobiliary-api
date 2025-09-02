import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { Sequelize, Op, literal } from 'sequelize';
import { SearchPropertiesDto } from './dto/search-properties.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PropertyService {

  constructor(
    @InjectModel(Property)
    private propertyModel: typeof Property,
    private configService: ConfigService,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyModel.create({...createPropertyDto});
  }

  async findAll(queryProps: SearchPropertiesDto) {
    const {
      page = this.configService.get('PAGINATION_PAGE')?? 1,
      limit = this.configService.get('PAGINATION_LIMIT')?? 10,
      orderBy = this.configService.get<string>('ORDER_BY') ?? 'id',
      orderDir = (this.configService.get<string>('ORDER_DIR') ?? 'ASC') as 'ASC' | 'DESC',
      query,
      ...filters
    } = queryProps;

    const where: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        where[key] = value;
      }
    });
    // Full-text search en query en varios campos (description, title)
    if (query) {
      const searchFields = ['description', 'title'];
      const tsvector = searchFields
      .map(field => `COALESCE("${field}", '')`)
      .join(" || ' ' || ");
      where[Op.and] = [
      ...(where[Op.and] || []),
      literal(`to_tsvector('spanish', ${tsvector}) @@ plainto_tsquery('spanish', '${query.replace(/'/g, "''")}')`)
      ];
    }

    // 1. Consulta principal paginada
    const result = await this.propertyModel.findAndCountAll({
      where,
      order: [[orderBy, orderDir]],
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });

    // 2. Filtros disponibles (únicos) en base a los resultados actuales
    // Puedes agregar más campos según lo que quieras mostrar como filtros
    const filterFields = [
      'city',
      'type',
      'status',
      'hasPool',
      'hasBalcony',
      'hasGarden',
      'isFurnished',
      'isGatedCommunity'
    ];

    // Para cada filtro, quitamos ese filtro del where y buscamos los valores únicos posibles
    const availableFilters: Record<string, any[]> = {};
    for (const field of filterFields) {
      // Clonamos el where y quitamos el filtro actual
      const whereForFilter = { ...where };
      delete whereForFilter[field];

      // Si hay búsqueda por query, mantenla
      if (query) {
        whereForFilter[Op.and] = where[Op.and];
      }

      const values = await this.propertyModel.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col(field)), field]],
        where: whereForFilter,
        raw: true,
      });
      availableFilters[field] = values.map(v => v[field]).filter(v => v !== null);
    }

    return {
      data: result.rows,
      total: result.count,
      page: Number(page),
      limit: Number(limit),
      availableFilters,
    };
  }

  findOne(id: number) {
    return this.propertyModel.findOne({ where: { id } });
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyModel.update(updatePropertyDto, { where: { id } });
  }

  remove(id: number) {
    return this.propertyModel.destroy({ where: { id } });
  }

  findByAgent(agentId: number) {
    return this.propertyModel.findAll({ where: { agentId } });
  }
}
