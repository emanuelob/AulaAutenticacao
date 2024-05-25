import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserPayload } from './types/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './types/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
    login(user: UserEntity): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
        };

        console.log("Valor da chave secreta:", process.env.JWT_SECRET);
        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        };
    }

    async validateUser(email: string, senha: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(senha, user.senha);

            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                };
            } 
        } 
        throw new UnauthorizedException('Usuário ou senha incorretos');   
    }
}
