import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPayload } from '../types/UserPayload';
import { UserFromJwt } from '../types/UserFromJwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  
  async validate(payload: UserPayload): Promise<UserFromJwt> {
    const userExists = await this.userService.findByEmail(payload.email);
    if (!userExists) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
    
    return {
      userId: payload.sub, 
      email: payload.email,
    };
  }
}