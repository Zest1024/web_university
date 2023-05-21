import { Module } from '@nestjs/common';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

import { DatabaseModule } from '../../database/database.module';
import { QuizzesProvider } from '../../database/providers/quizzes.provider';

@Module({
  imports: [DatabaseModule],
  providers: [QuizzesService, QuizzesProvider],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
