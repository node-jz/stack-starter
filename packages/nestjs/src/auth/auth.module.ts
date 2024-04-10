import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EntitiesModule } from 'src/entities/entities.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleExtStrategy } from './strategies/googleExt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    EntitiesModule,
    JwtModule.register({
      secret: `${process.env['JWT_SECRET_KEY']}`,
      signOptions: { expiresIn: `${process.env['JWT_EXPIRES']}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, GoogleExtStrategy, AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
