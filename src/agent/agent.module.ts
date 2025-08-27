import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { User } from 'src/auth/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agent } from './entities/agent.entity';

@Module({
  controllers: [AgentController],
  imports: [
    SequelizeModule.forFeature([User, Agent])
  ],
  providers: [AgentService],
})
export class AgentModule {}
