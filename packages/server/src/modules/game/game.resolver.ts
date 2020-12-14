import { UseGuards } from '@nestjs/common'
import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator'
import { AllowRole } from '../auth/auth.decorator'
import { RoleGuard } from '../auth/auth.guard'
import { Roles } from '../user/user.model'
import { Game } from './game.entity'
import { GameService } from './game.service'

@ArgsType()
class CreateGameArgs {
  @IsNotEmpty({
    message: '游戏名称不能为空',
  })
  @MaxLength(128, {
    message: '游戏名称不能超过$constraint1个字符',
  })
  @Field()
  name: string

  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    {
      message: '游戏封面必须是合法的URL格式',
    },
  )
  @Field()
  cover: string
}

@Resolver(() => Game)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @AllowRole(Roles.MAP_CONTRIBUTOR)
  @UseGuards(RoleGuard)
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }

  @Mutation(() => Game)
  async createGame(@Args({ type: () => CreateGameArgs }) args: CreateGameArgs) {
    return {
      id: 0,
      ...args,
    }
  }
}
