import { DataSource } from 'typeorm';

import { Choice } from '../../modules/choices/choices.entity';
import { DATABASE_CONNECTIONS, REPOSITORIES } from '../database.provider';

export const ChoiceProvider = {
  provide: REPOSITORIES.CHOICES,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Choice),
  inject: [DATABASE_CONNECTIONS.POSTGRES],
};
