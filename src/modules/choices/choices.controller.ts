import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Choice } from './choices.entity';
import { AnswerChoices, CreateChoiceDto } from './choices.interface';
import { ChoicesService } from './choices.service';

import { UserData } from '../../decorators/user.decorator';
import {
  SuccessResponseType,
  toSuccessResponse,
} from '../../helpers/response.helper';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { Question } from '../questions/questions.entity';
import { User } from '../users/users.entity';

@ApiTags('Choices Module')
@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @Get('/:questionId')
  @ApiOperation({ summary: 'get choices by questionid' })
  @ApiOkResponse({ type: SuccessResponseType<Question[]> })
  async getChoices(@UserData() user: User, @Param('questionId') id: string) {
    const quizzes = await this.choicesService.getChoices({
      question: { id },
    });
    return toSuccessResponse(quizzes);
  }

  @Post()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create choices' })
  @ApiBody({ type: [CreateChoiceDto] })
  @ApiOkResponse({ type: SuccessResponseType })
  async createChoices(
    @UserData() user: User,
    @Body() choices: CreateChoiceDto[],
  ) {
    await this.choicesService.createChoices(
      choices.map<Choice>((choice, index) => ({
        ...choice,
        orderNumber: index,
      })),
    );
    return toSuccessResponse();
  }

  @Post('answer')
  @ApiOperation({ summary: 'answer the choices' })
  @JwtAuth()
  @ApiBearerAuth()
  @ApiBody({ type: [AnswerChoices] })
  @ApiOkResponse({ type: SuccessResponseType })
  async answerChoices(
    @UserData() user: User,
    @Body() choices: AnswerChoices[],
  ) {
    await this.choicesService.answerChoices(choices, user.id);
    return toSuccessResponse();
  }

  @Get('answer/:questionId')
  @ApiOperation({ summary: 'get answers' })
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessResponseType })
  async getAnswers(@UserData() user: User, @Param('questionId') id: string) {
    const answers = await this.choicesService.getChoicesWithUser({
      question: { id },
      users: { id: user.id },
    });
    return toSuccessResponse(answers);
  }
}
