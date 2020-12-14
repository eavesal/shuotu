import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { Reflector } from '@nestjs/core'
import { ROLE_METADATA_KEY } from './auth.decorator'
import { Roles, RolesOrder, User } from '../user/user.model'
import { gqlAuthError } from '../../utils/errors'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    return super.canActivate(new ExecutionContextHost([req]))
  }

  handleRequest<User>(err: any, user: User) {
    if (err || !user) {
      throw err || gqlAuthError()
    }
    return user
  }
}

@Injectable()
export class RoleGuard extends GqlAuthGuard {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isAuthed = await super.canActivate(context)
    if (!isAuthed) {
      throw gqlAuthError()
    }

    const role = this.reflector.get<Roles>(ROLE_METADATA_KEY, context.getHandler())
    if (!role) {
      return true
    }
    const requiredRoleIndex = RolesOrder.indexOf(role)

    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const user: User = req.user
    const currentRoleIndex = RolesOrder.indexOf(user.role)

    if (currentRoleIndex >= 0 && requiredRoleIndex >= 0 && currentRoleIndex <= requiredRoleIndex) {
      return true
    }

    throw gqlAuthError()
  }
}
