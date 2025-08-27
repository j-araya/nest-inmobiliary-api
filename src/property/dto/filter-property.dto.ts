import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterPropertyDto {
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
}