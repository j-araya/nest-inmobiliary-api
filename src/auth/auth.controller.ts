import { Body, Controller, Post, ForbiddenException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ROLE } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() { email, password }: { email: string, password: string }) {
        const user = await this.authService.validateUser(email, password)
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        const token = this.authService.generateJWT(user);
        return { token }
    }

    @Post('signup')
    async signup(@Body() { email, password }: { email: string, password: string }) {
        const userCheck = await this.authService.getUserByEmail(email)

        if (userCheck) {
            throw new ConflictException('User already exists');
        }

        const user = await this.authService.createUser(email, password)
        const token = this.authService.generateJWT(user);
        return { token }
    }
}
