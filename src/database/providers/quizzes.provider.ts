import { DataSource } from 'typeorm';

import { Quiz } from '../../modules/quizzes/quizzes.entity';
import { DATABASE_CONNECTIONS, REPOSITORIES } from '../database.provider';

export const QuizzesProvider = {
  provide: REPOSITORIES.QUIZZES,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Quiz),
  inject: [DATABASE_CONNECTIONS.POSTGRES],
};
