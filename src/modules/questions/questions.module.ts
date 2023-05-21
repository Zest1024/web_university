import { Module } from '@nestjs/common';

import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

import { DatabaseModule } from '../../database/database.module';
import { QuestionsProvider } from '../../database/providers/questions.provider';

@Module({
  imports: [DatabaseModule],
  providers: [QuestionsService, QuestionsProvider],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
