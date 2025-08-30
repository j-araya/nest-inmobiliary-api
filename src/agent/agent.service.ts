import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/auth/entities/user.entity';
import { Agent } from './entities/agent.entity';
import * as  bcrypt from 'bcrypt'
import { ROLE } from 'src/auth/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { AgentResponseDto } from './dto/agent-response.dto';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Agent)
    private agentModel: typeof Agent,
  ) { }

  async findAll() {
    const agents = await this.agentModel.findAll();
    return plainToInstance(AgentResponseDto, agents.map(a => a.get({ plain: true })));
  }

  async findOne(id: number) {
    const agent = await this.agentModel.findByPk(id);
    if (!agent) return null;
    return plainToInstance(AgentResponseDto, agent.get({ plain: true }));
  }

  async create(createAgentDto: CreateAgentDto) {
    // create user and agent with a postgress transaction in sequelize
    return this.userModel.sequelize?.transaction(async (transaction) => {
      const { password } = createAgentDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await this.userModel.create({ ...createAgentDto, password: hashedPassword, role: ROLE.AGENT}, { transaction });
      const agent = await this.agentModel.create(
        { ...createAgentDto, userId: user.id } as any,
        { transaction }
      );
      return {
        user: plainToInstance(UserResponseDto, user.get({ plain: true })),
        agent: plainToInstance(AgentResponseDto, agent.get({ plain: true })),
      };
    });
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return this.agentModel.update(updateAgentDto, { where: { id } });
  }

  remove(id: number) {
    return this.agentModel.destroy({ where: { id } });
  }
}
