import { DataSource } from 'typeorm';

import { User } from '../../modules/users/users.entity';
import { DATABASE_CONNECTIONS, REPOSITORIES } from '../database.provider';

export const UsersProvider = {
  provide: REPOSITORIES.USERS,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: [DATABASE_CONNECTIONS.POSTGRES],
};
