import { SetMetadata } from '@nestjs/common';

export enum ROLE { 
    CUSTOMER = "CUSTOMER", 
    ADMIN = "ADMIN", 
    SUPERADMIN = "SUPERADMIN", 
}

export const ROLES_KEY = 'roles'

export const Roles = (...args: ROLE[]) => SetMetadata(ROLES_KEY, args);
