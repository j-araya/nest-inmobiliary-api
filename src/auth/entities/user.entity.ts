import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { ROLE } from '../decorators/roles.decorator';
import { Agent } from 'src/agent/entities/agent.entity';

@Table
export class User extends Model {
    @Column({
        unique: true,
    })
    email: string;

    @Column
    password: string;

    
    @Column({
        values: Object.values(ROLE)
    })
    role: string;

    // May Has Agent Profile
    @HasOne(() => Agent)
    agent: Agent;
}
