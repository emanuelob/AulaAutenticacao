import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';

@Module({
  imports: [PrismaModule, UserModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
    ],
})
export class AppModule {}
