import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize';

import { Game } from './game.model';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  providers: [GameService, GameResolver],
  exports: [],
})
export class GameModule {}
