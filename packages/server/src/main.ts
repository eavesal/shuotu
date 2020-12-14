import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { UserInputError } from 'apollo-server'
import { flatten } from 'ramda'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      exceptionFactory(errors) {
        const messages = flatten(errors.map(x => Object.values(x.constraints)))
        return new UserInputError(messages[0])
      },
    }),
  )
  await app.listen(process.env.NODE_ENV === 'development' ? 3000 : 80)
}
bootstrap()
