import { Module } from '@nestjs/common';

import { ChoicesController } from './choices.controller';
import { ChoicesService } from './choices.service';

import { DatabaseModule } from '../../database/database.module';
import { ChoiceProvider } from '../../database/providers/choices.provider';
import { ChoicesGateway } from './choices.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [ChoicesService, ChoiceProvider, ChoicesGateway],
  controllers: [ChoicesController],
})
export class ChoicesModule {}
