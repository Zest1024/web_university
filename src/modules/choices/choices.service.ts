import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import { Choice } from './choices.entity';
import { ChoicesGateway } from './choices.gateway';
import { AnswerChoices } from './choices.interface';

import { REPOSITORIES } from '../../database/database.provider';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class ChoicesService {
  constructor(
    @Inject(REPOSITORIES.CHOICES)
    private readonly choiceRepository: Repository<Choice>,
    private readonly choicesGateway: ChoicesGateway,
  ) {}

  async createChoices(choices: Partial<Choice>[]) {
    return this.choiceRepository.save(choices);
  }

  async getChoices(choiceOptions: FindOptionsWhere<Choice>) {
    return await this.choiceRepository.find({
      where: choiceOptions,
    });
  }

  async getChoicesWithUser(choiceOptions: FindOptionsWhere<Choice>) {
    return await this.choiceRepository.find({
      where: choiceOptions,
      relations: { users: true, question: true },
    });
  }

  async answerChoices(choices: AnswerChoices[], userId: string) {
    const foundChoices = await this.choiceRepository.find({
      where: [...choices.map(({ id }) => ({ id }))],
      relations: { users: true },
    });

    await this.choiceRepository.save(
      foundChoices.map<Choice>((choice) => ({
        id: choice.id,
        users: [...choice.users, { id: userId }],
      })),
    );

    this.choicesGateway.emitMessage({ ...choices, userId });

    return choices;
  }
}
