import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AgentService } from 'src/agent/agent.service';
import { Agent } from 'src/agent/entities/agent.entity';

@Global()
@Module({
  imports: [

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt.secret')
        }
      }
    }),
      SequelizeModule.forFeature([User]),
      SequelizeModule.forFeature([Agent]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AgentService],
  exports: [AuthService, AgentService]
})
export class AuthModule {}
