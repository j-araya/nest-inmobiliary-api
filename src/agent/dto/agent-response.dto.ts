import { Exclude, Expose } from 'class-transformer';

@Expose()
export class AgentResponseDto {
  @Expose()
  agentId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  agency: string;

  @Expose()
  bio: string;

  @Expose()
  profileImageUrl: string;

  @Expose()
  rating: number;

  @Expose()
  closedSales: number;

  @Expose()
  isActive: boolean;

  // Add more fields as needed, but omit licenseNumber
}