import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { Choice } from '../modules/choices/choices.entity';
import { Question } from '../modules/questions/questions.entity';
import { Quiz } from '../modules/quizzes/quizzes.entity';
import { User } from '../modules/users/users.entity';

export enum DATABASE_CONNECTIONS {
  POSTGRES = 'POSTGRES',
}

export enum REPOSITORIES {
  USERS = 'USERS',
  QUESTIONS = 'QUESTIONS',
  CHOICES = 'CHOICES',
  QUIZZES = 'QUIZZES',
  ANSWERS = 'ANSWERS',
}

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTIONS.POSTGRES,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      new DataSource({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: 5432,
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        entities: [Choice, Question, Quiz, User],
        synchronize: true,
        database: configService.getOrThrow<string>('POSTGRES_DB'),
      }).initialize(),
  },
];
