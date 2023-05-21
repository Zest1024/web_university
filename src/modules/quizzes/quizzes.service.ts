import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import { Quiz } from './quizzes.entity';

import { REPOSITORIES } from '../../database/database.provider';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class QuizzesService {
  constructor(
    @Inject(REPOSITORIES.QUIZZES)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getQuizzes(quizOptions: FindOptionsWhere<Quiz>) {
    return await this.quizRepository.find({ where: quizOptions });
  }

  async getDetailedQuiz(quizOptions: FindOptionsWhere<Quiz>) {
    return await this.quizRepository.find({
      where: quizOptions,
      relations: { questions: { choices: true } },
    });
  }

  async createQuiz(quiz: Partial<Quiz>) {
    return this.quizRepository.save(quiz);
  }
}
