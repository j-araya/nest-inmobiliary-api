import { ROLE } from "../decorators/roles.decorator";

export interface JWTPayload{
    email: string,
    userId: number,
    role: ROLE,
}