import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserInputError } from 'apollo-server'
import { hash } from 'bcrypt'

import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll()
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    })
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        username,
      },
    })
  }

  async create(username: string, password: string) {
    const user = await this.findByUsername(username)

    if (user) {
      throw new UserInputError('该用户名已被注册，请使用其它用户名')
    }

    return this.userModel.create({
      username,
      password: await hash(password, 10),
    })
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id)
    await user.destroy()
  }
}
