import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import { Question } from './questions.entity';

import { REPOSITORIES } from '../../database/database.provider';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(REPOSITORIES.QUESTIONS)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestions(questions: Partial<Question>[]) {
    return this.questionRepository.save(questions);
  }

  async getQuestions(questionOptions: FindOptionsWhere<Question>) {
    return await this.questionRepository.find({
      where: questionOptions,
    });
  }
}
