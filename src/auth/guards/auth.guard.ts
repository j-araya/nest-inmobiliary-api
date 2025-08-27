import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ROLE, ROLES_KEY } from '../decorators/roles.decorator';
import { JWTPayload } from '../entities/jwt-payload.entity';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    )

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    const payload: JWTPayload | null = this.authService.validateJWT(
      token,
    );

    if (!payload || !payload.role) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = payload;
    
    const roles: ROLE[] = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler())

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(payload.role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}