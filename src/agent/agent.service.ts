import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/auth/entities/user.entity';
import { Agent } from './entities/agent.entity';
import * as  bcrypt from 'bcrypt'

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Agent)
    private agentModel: typeof Agent,
  ) { }


  create(createAgentDto: CreateAgentDto) {
    // create user and agent with a postgress transaction in sequelize
    return this.userModel.sequelize?.transaction(async (transaction) => {
      const { password } = createAgentDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await this.userModel.create({ ...createAgentDto, password: hashedPassword}, { transaction });
      const agent = await this.agentModel.create(
        { ...createAgentDto, userId: user.id } as any,
        { transaction }
      );
      return { user, agent };
    });
  }

  findAll() {
    return `This action returns all agent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
