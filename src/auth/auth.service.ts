import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.senha);

            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                }
            }
        }
        throw new UnauthorizedException('Usuário ou senha incorretos');   
    }
}
