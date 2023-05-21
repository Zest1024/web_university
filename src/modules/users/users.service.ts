import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import { User } from './users.entity';

import { REPOSITORIES } from '../../database/database.provider';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  async findUser(userOptions: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({ where: userOptions });
    if (!user) {
      throw new Error(`User with ${JSON.stringify(userOptions)} not found`);
    }
    return user;
  }

  updateUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}
