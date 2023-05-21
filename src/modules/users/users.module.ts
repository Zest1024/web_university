import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { DatabaseModule } from '../../database/database.module';
import { UsersProvider } from '../../database/providers/users.provider';
import { AuthModule } from '../auth/auth.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), QueueModule],
  providers: [UsersService, UsersProvider],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
