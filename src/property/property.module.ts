import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from './entities/property.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    
      SequelizeModule.forFeature([Property]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
