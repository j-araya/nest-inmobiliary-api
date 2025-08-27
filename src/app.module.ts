import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { Property } from './property/entities/property.entity';
import { Agent } from './agent/entities/agent.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
        load: [configuration],
      }
    ),
    SequelizeModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            dialect: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            models: [
              Property,
              Agent,
              User,
              
            ],
            autoLoadModels: true,
            synchronize: true,

          }
        }
      }),
      AgentModule,
      PropertyModule, 
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
