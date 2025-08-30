import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ROLE, Roles } from 'src/auth/decorators/roles.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@UseGuards(AuthGuard)
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Roles(ROLE.SUPERADMIN)
  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.agentService.findAll();
  }
  
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @Roles(ROLE.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Roles(ROLE.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }
}
