import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreatePropertyDto {
  // --- 1. Identificación y Referencias ---
  @IsNotEmpty()
  @IsInt()
  agentId: number;

  // --- 2. Detalles Básicos de la Propiedad ---
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  type: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  subType: string;

  // --- 3. Ubicación y Geografía ---
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  stateProvince: string;

  @IsOptional()
  @IsString()
  zipCode: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  // --- 4. Características Físicas y de Construcción ---
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsInt()
  bedrooms: number;

  @IsOptional()
  @IsInt()
  bathrooms: number;

  @IsOptional()
  @IsInt()
  halfBathrooms: number;

  @IsOptional()
  @IsNumber()
  squareFootageM2: number;

  @IsOptional()
  @IsNumber()
  lotSizeM2: number;

  @IsOptional()
  @IsInt()
  yearBuilt: number;

  @IsOptional()
  @IsInt()
  parkingSpaces: number;

  @IsOptional()
  @IsInt()
  floors: number;

  // --- 5. Amenidades y Servicios ---
  @IsOptional()
  @IsBoolean()
  hasPool: boolean;

  @IsOptional()
  @IsBoolean()
  hasBalcony: boolean;

  @IsOptional()
  @IsBoolean()
  hasPowerPlant: boolean;

  @IsOptional()
  @IsBoolean()
  hasWaterHole: boolean;

  @IsOptional()
  @IsBoolean()
  hasGarden: boolean;

  @IsOptional()
  @IsBoolean()
  isFurnished: boolean;

  @IsOptional()
  @IsBoolean()
  isGatedCommunity: boolean;

  @IsOptional()
  @IsNumber()
  hoaFees: number;

  // --- 6. Medios y Visuales ---
  @IsOptional()
  @IsString()
  @IsUrl()
  mainImageUrl: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  virtualTourUrl: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  // --- 7. Información Legal y de Publicación ---
  @IsOptional()
  @IsDateString()
  listingStartDate: Date;

  @IsOptional()
  @IsDateString()
  listingEndDate: Date;

  @IsOptional()
  @IsDateString()
  lastViewedAt: Date;

  @IsOptional()
  @IsString()
  legalStatus: string;

  @IsOptional()
  @IsString()
  publicationStatus: string;

  @IsOptional()
  @IsString()
  remarks: string;

  @IsOptional()
  mainImage: Express.Multer.File;

  @IsOptional()
  images: Express.Multer.File[];

}
