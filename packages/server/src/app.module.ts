import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { SequelizeModule } from '@nestjs/sequelize'
import { join } from 'path'

import { AppController } from './app.controller'
import { GlobalEnvVars } from './global.type'
import { AuthModule } from './modules/auth/auth.module'
import { GameModule } from './modules/game/game.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(__dirname, 'schema.gql'),
      sortSchema: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService<GlobalEnvVars>) {
        return {
          dialect: 'mysql',
          host: configService.get('MYSQL_DB_HOST'),
          port: +configService.get('MYSQL_DB_PORT'),
          username: configService.get('MYSQL_DB_USERNAME'),
          password: configService.get('MYSQL_DB_PASSWORD'),
          database: configService.get('MYSQL_DB_DATABASE'),
          autoLoadModels: true,
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    GameModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
