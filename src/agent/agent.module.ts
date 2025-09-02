import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { User } from 'src/auth/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agent } from './entities/agent.entity';
import { PropertyService } from 'src/property/property.service';
import { PropertyModule } from 'src/property/property.module';
import { Property } from 'src/property/entities/property.entity';

@Module({
  controllers: [AgentController],
  imports: [
    PropertyModule,
    SequelizeModule.forFeature([User, Agent, Property])
  ],
  providers: [AgentService, PropertyService],
})
export class AgentModule {}
