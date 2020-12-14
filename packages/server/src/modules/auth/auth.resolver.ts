import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator'
import { Auth } from './auth.entity'
import { AuthService } from './auth.service'

@ArgsType()
class UserCreationOrLogin {
  @Matches(/^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,32})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,32})$/, {
    message: '用户名不合法，用户名仅允许使用中文、英文、数字或下划线',
  })
  @MaxLength(32, {
    message: '用户名不能超过$constraint1个字符',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Field()
  username: string

  @MinLength(8, {
    message: '密码不能少于$constraint1个字符',
  })
  @Field()
  password: string
}

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async register(@Args({ type: () => UserCreationOrLogin }) args: UserCreationOrLogin): Promise<Auth> {
    return this.authService.register(args.username, args.password)
  }

  @Query(() => Auth)
  async login(@Args({ type: () => UserCreationOrLogin }) args: UserCreationOrLogin): Promise<Auth> {
    return this.authService.login(args.username, args.password)
  }
}
