import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthenticationError } from 'apollo-server-express'
import { ConfigService } from '@nestjs/config'

import { AuthService, JWTPayload } from './auth.service'
import { GlobalEnvVars } from '../../global.type'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<GlobalEnvVars>, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      ignoreExpiration: false,
    })
  }

  async validate(payload: JWTPayload): Promise<any> {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new AuthenticationError('您的登录凭证已失效，请重新登录')
    }

    console.log('****user is validated***')
    return user
  }
}
