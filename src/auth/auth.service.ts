import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as  bcrypt from 'bcrypt'
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './entities/jwt-payload.entity';
import { ROLE } from './decorators/roles.decorator';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService,
    ) { }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({ where: { email } });
    }

    createUser(email: string, password: string) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return this.userModel.create({ email, password: hashedPassword });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.getUserByEmail(email)
        if (!user) return null;
        if (bcrypt.compareSync(password, user.toJSON().password)){
            return user;
        }
        return null
    }

    generateJWT(user: User){

        console.log("user", user)
        const userData = user.toJSON();
        console.log("USER DATA", userData)

        const payload: JWTPayload = { 
            email: userData.email,  
            userId: userData.id,
            role: userData.role,

        };
        return this.jwtService.sign(payload);
    }

    validateJWT(token: string): JWTPayload | null {
        try {
            return this.jwtService.verify<JWTPayload>(token);
        } catch (error) {
            return null;
        }
    }
}
