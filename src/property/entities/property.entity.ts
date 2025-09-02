
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Agent } from 'src/agent/entities/agent.entity';

@Table({
  tableName: 'properties',
  timestamps: true, // Esto habilitará las columnas `createdAt` y `updatedAt` automáticamente
})
export class Property extends Model {

  // --- 1. Identificación y Referencias ---
  @ForeignKey(() => Agent)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,

    comment: 'ID del agente (clave foránea)'
  })
  agentId: number;

  @BelongsTo(() => Agent)
  agent: Agent;

  // --- 2. Detalles Básicos de la Propiedad ---
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: 'Título de la publicación'
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    comment: 'Descripción detallada'
  })
  description: string;

  @Column({
    type: DataType.STRING(50),
    comment: 'Tipo de inmueble (ej. Casa, Apartamento)'
  })
  type: string;

  @Column({
    type: DataType.ENUM('Disponible', 'Pendiente de Venta', 'Vendida', 'Alquilada', 'Desactivada'),
    defaultValue: 'Disponible',
    comment: 'Estado de la propiedad'
  })
  status: string;

  @Column({
    type: DataType.STRING(50),

    comment: 'Subtipo de la propiedad (ej. Penthouse)'
  })
  subType: string;

  // --- 3. Ubicación y Geografía ---
  @Column({
    type: DataType.STRING,
    comment: 'Dirección completa'
  })
  address: string;

  @Column(DataType.STRING)
  city: string;

  @Column({
    type: DataType.STRING,

    comment: 'Estado o provincia'
  })
  stateProvince: string;

  @Column({
    type: DataType.STRING(20),

    comment: 'Código postal'
  })
  zipCode: string;

  @Column(DataType.STRING(50))
  country: string;

  @Column(DataType.STRING)
  neighborhood: string;

  @Column(DataType.FLOAT)
  latitude: number;

  @Column(DataType.FLOAT)
  longitude: number;

  // --- 4. Características Físicas y de Construcción ---
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Precio'
  })
  price: number;

  @Column(DataType.INTEGER)
  bedrooms: number;

  @Column(DataType.INTEGER)
  bathrooms: number;

  @Column({
    type: DataType.INTEGER,

  })
  halfBathrooms: number;

  @Column({
    type: DataType.FLOAT,

    comment: 'Superficie habitable en m²'
  })
  squareFootageM2: number;

  @Column({
    type: DataType.FLOAT,

    comment: 'Tamaño del terreno en m²'
  })
  lotSizeM2: number;

  @Column({
    type: DataType.INTEGER,

    comment: 'Año de construcción'
  })
  yearBuilt: number;


  @Column({
    type: DataType.INTEGER,

  })
  parkingSpaces: number;

  @Column(DataType.INTEGER)
  floors: number;

  // --- 5. Amenidades y Servicios ---
  @Column({
    type: DataType.BOOLEAN,

    comment: '¿Tiene piscina?'
  })
  hasPool: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  hasBalcony: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  hasPowerPlant: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  hasWaterHole: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  hasGarden: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  isFurnished: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  isGatedCommunity: boolean;

  @Column({
    type: DataType.DECIMAL(10, 2),

    comment: 'Cuotas de la HOA'
  })
  hoaFees: number;

  // --- 6. Medios y Visuales ---
  @Column({
    type: DataType.STRING(255),

  })
  mainImageUrl: string;

  @Column({
    type: DataType.STRING(255),

  })
  virtualTourUrl: string;

  @Column({
    type: DataType.STRING(255),

  })
  videoUrl: string;

  @Column({
    type: DataType.JSONB,

    comment: 'Arreglo de URLs de imágenes'
  })
  imageUrls: string[];

  // --- 7. Información Legal y de Publicación ---
  @Column({
    type: DataType.DATE,

  })
  listingStartDate: Date;

  @Column({
    type: DataType.DATE,

  })
  listingEndDate: Date;

  // `createdAt` y `updatedAt` se manejan automáticamente por Sequelize con `timestamps: true`

  @Column({
    type: DataType.DATE,

  })
  lastViewedAt: Date;

  @Column({
    type: DataType.STRING(50),

  })
  legalStatus: string;

  @Column({
    type: DataType.STRING(50),

  })
  zoningType: string;
}
