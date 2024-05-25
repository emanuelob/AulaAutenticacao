import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserPayload } from '../types/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }
  
  async validate(payload: UserPayload): Promise<Partial<UserPayload>> {
    console.log('JWT Secret:', process.env.JWT_SECRET);
    console.log('Payload:', payload);
    return {
      sub: payload.sub, 
      email: payload.email,
    };
  }
}