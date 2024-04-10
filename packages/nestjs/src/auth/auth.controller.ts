import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private emitter: EventEmitter2) {}
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('auth/google/ext')
  @UseGuards(AuthGuard('googleExt'))
  async googleAuthExt(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // Handles the Google OAuth2 callback
    // The user will be authenticated at this point
    // this would be the JWT creation point. Return a JWT token.
    const loginResult = await this.authService.login(req.user);
    res.redirect(`${process.env['FRONTEND_URL']}/login?token=${loginResult.access_token}&expires=${process.env.JWT_EXPIRES}`);
  }

  @Get('auth/google/callback/ext')
  @UseGuards(AuthGuard('googleExt'))
  async googleAuthRedirectExt(@Req() req, @Res() res) {
    // Handles the Google OAuth2 callback
    // The user will be authenticated at this point
    // this would be the JWT creation point. Return a JWT token.
    const loginResult = await this.authService.login(req.user);
    if (req.user.onboarding_metadata.first_login) {
      this.emitter.emit('user.created', req.user.id);
    }
    res.redirect(`${process.env['FRONTEND_URL']}/login/ext?token=${loginResult.access_token}&expires=${process.env.JWT_EXPIRES}`);
  }
}
