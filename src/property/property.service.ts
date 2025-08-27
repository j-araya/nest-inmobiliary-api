import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { FilterPropertyDto } from './dto/filter-property.dto';

@Injectable()
export class PropertyService {

  constructor(
    @InjectModel(Property)
    private propertyModel: typeof Property,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyModel.create({...createPropertyDto});
  }

  findAll(query: FilterPropertyDto) {
    return this.propertyModel.findAll({ where: { ...query } });
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
}
