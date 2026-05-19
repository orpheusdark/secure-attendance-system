import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, type LoginInput } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginInput) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body: { refreshToken: string; deviceId: string }) {
    return this.authService.refreshSession(body.refreshToken, body.deviceId);
  }

  @Post('logout-all')
  logoutAll(@Body() body: { userId: string }) {
    return this.authService.logoutAllDevices(body.userId);
  }
}
