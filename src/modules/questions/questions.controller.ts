import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Question } from './questions.entity';
import { CreateQuestionDto } from './questions.interface';
import { QuestionsService } from './questions.service';

import { UserData } from '../../decorators/user.decorator';
import {
  SuccessResponseType,
  toSuccessResponse,
} from '../../helpers/response.helper';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { User } from '../users/users.entity';

@ApiTags('Questions Module')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/:quizId')
  @ApiOperation({ summary: 'get user quiz' })
  @ApiOkResponse({ type: SuccessResponseType<Question[]> })
  async getUserQuizzes(@UserData() user: User, @Param('quizId') id: string) {
    const quizzes = await this.questionsService.getQuestions({
      quiz: { id },
    });
    return toSuccessResponse(quizzes);
  }

  @Post()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create questions' })
  @ApiBody({ type: [CreateQuestionDto] })
  @ApiOkResponse({ type: SuccessResponseType })
  async createQuestions(
    @UserData() user: User,
    @Body() questions: CreateQuestionDto[],
  ) {
    await this.questionsService.createQuestions(
      questions.map<Question>((question, index) => ({
        ...question,
        orderNumber: index,
      })),
    );
    return toSuccessResponse();
  }
}
