import { 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Post, 
    UseGuards, 
    Request 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './types/AuthRequest';
import { Public } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
