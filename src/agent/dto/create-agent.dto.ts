
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsEmail } from 'class-validator';

export class CreateAgentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    // Atributes from Agent Model
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    licenseNumber: string;

    @IsOptional()
    @IsString()
    agency: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    profileImageUrl: string;

}
