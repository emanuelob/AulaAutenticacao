import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
