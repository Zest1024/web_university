import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Quiz } from './quizzes.entity';
import { CreateQuizDto } from './quizzes.interface';
import { QuizzesService } from './quizzes.service';

import { UserData } from '../../decorators/user.decorator';
import {
  SuccessResponseType,
  toSuccessResponse,
} from '../../helpers/response.helper';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { User } from '../users/users.entity';

@ApiTags('Quizzes Module')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get user quizzes' })
  @ApiOkResponse({ type: SuccessResponseType })
  async getUserQuizzes(@UserData() user: User) {
    const quizzes = await this.quizzesService.getQuizzes({
      creator: { id: user.id },
    });
    return toSuccessResponse(quizzes);
  }

  @Post()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create quiz' })
  @ApiOkResponse({ type: SuccessResponseType<Quiz[]> })
  async createQuiz(@UserData() user: User, @Body() quiz: CreateQuizDto) {
    await this.quizzesService.createQuiz({ ...quiz, creator: { id: user.id } });
    return toSuccessResponse();
  }

  @Get('/all')
  @ApiOperation({ summary: 'get all quizzes' })
  @ApiOkResponse({ type: SuccessResponseType<Quiz[]> })
  async getAllQuizzes() {
    const quizzes = await this.quizzesService.getQuizzes({});
    return toSuccessResponse(quizzes);
  }

  @Get('/:quizId')
  @ApiOperation({ summary: 'get full quiz' })
  @ApiOkResponse({ type: SuccessResponseType<Quiz> })
  async getDetailedQuiz(@Param('quizId') id: string) {
    const quizzes = await this.quizzesService.getDetailedQuiz({ id });
    return toSuccessResponse(quizzes);
  }
}
