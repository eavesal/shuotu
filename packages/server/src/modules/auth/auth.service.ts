import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticationError } from 'apollo-server'
import { compare } from 'bcrypt'

import { UserService } from '../user/user.service'
import { Auth } from './auth.entity'

export interface JWTPayload {
  username: string
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(username: string, password: string) {
    const user = await this.userService.create(username, password)
    return this.createToken(user)
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)

    if (user) {
      const passwordHash = user.password
      const isMatch = await compare(password, passwordHash)
      if (isMatch) {
        return this.createToken(user)
      }
    }

    throw new AuthenticationError('用户名或密码错误')
  }

  // TODO: should be optimize using redis cache
  async validateUser(payload: JWTPayload): Promise<any> {
    const user = await this.userService.findByUsername(payload.username)

    if (user) {
      return user
    }

    return null
  }

  private createToken(user: { username: string }): Auth {
    return {
      token: this.jwtService.sign({
        username: user.username,
      }),
    }
  }
}
