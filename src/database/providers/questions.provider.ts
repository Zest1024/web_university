import { DataSource } from 'typeorm';

import { Question } from '../../modules/questions/questions.entity';
import { DATABASE_CONNECTIONS, REPOSITORIES } from '../database.provider';

export const QuestionsProvider = {
  provide: REPOSITORIES.QUESTIONS,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
  inject: [DATABASE_CONNECTIONS.POSTGRES],
};
