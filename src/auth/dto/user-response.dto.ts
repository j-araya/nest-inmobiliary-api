import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  // Agrega otros campos que quieras exponer, pero omite password
}