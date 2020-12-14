import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Roles } from '../user/user.model'

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.user
})

export const ROLE_METADATA_KEY = Symbol('role')

export const AllowRole = (role: Roles) => SetMetadata(ROLE_METADATA_KEY, role)
