import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { Property } from 'src/property/entities/property.entity';

@Table({
  tableName: 'agents',
  timestamps: true, // Esto habilitará las columnas `createdAt` y `updatedAt` automáticamente
})
export class Agent extends Model<Agent> {

    
    // Add one to one nullable relationship with User
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userId: number;

    @BelongsTo(() => User,  'userId')
    user: User;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'agent_id',
    comment: 'Identificador único del agente'
  })
  agentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name',
    comment: 'Nombre del agente'
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name',
    comment: 'Apellido del agente'
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: 'Correo electrónico del agente'
  })
  email: string;

  @Column({
    type: DataType.STRING,
    comment: 'Número de teléfono del agente'
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    field: 'license_number',
    comment: 'Número de licencia de bienes raíces'
  })
  licenseNumber: string;

  @Column({
    type: DataType.STRING,
    comment: 'Empresa o agencia de bienes raíces'
  })
  agency: string;

  @Column({
    type: DataType.STRING,
    comment: 'Breve biografía del agente'
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    field: 'profile_image_url',
    comment: 'URL de la imagen de perfil del agente'
  })
  profileImageUrl: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0.0,
    comment: 'Calificación promedio del agente'
  })
  rating: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: 'Número de ventas cerradas'
  })
  closedSales: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
    comment: 'Estado de actividad del agente'
  })
  isActive: boolean;

  // Relación con las propiedades
  @HasMany(() => Property)
  properties: Property[];
}