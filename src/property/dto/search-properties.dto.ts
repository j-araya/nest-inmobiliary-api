import { IsOptional, IsString, IsNumber, IsBoolean, IsIn } from 'class-validator';

export class SearchPropertiesDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  hasPool?: boolean;

  @IsOptional()
  @IsBoolean()
  hasBalcony?: boolean;

  @IsOptional()
  @IsBoolean()
  hasPowerPlant?: boolean;

  @IsOptional()
  @IsBoolean()
  hasWaterHole?: boolean;

  @IsOptional()
  @IsBoolean()
  hasGarden?: boolean;

  @IsOptional()
  @IsBoolean()
  isFurnished?: boolean;

  @IsOptional()
  @IsBoolean()
  isGatedCommunity?: boolean;

  @IsOptional()
  @IsNumber()
  hoaFees?: number;

  // Nuevos campos para búsqueda avanzada
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderDir?: 'ASC' | 'DESC';
}