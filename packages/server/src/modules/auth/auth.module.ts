import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { GlobalEnvVars } from '../../global.type'

import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JWTStrategy } from './jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory(configService: ConfigService<GlobalEnvVars>) {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '7d',
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JWTStrategy, AuthResolver],
})
export class AuthModule {}
