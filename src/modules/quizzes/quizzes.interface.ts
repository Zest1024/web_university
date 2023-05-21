import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../questions/questions.entity';

export class CreateQuizDto {
  @ApiProperty({ default: 'test' })
  title: string;

  @ApiProperty({ default: [] })
  questions: Question[];
}

export class UpdateQuizDto {
  @ApiProperty({ default: 'uuid' })
  id: string;

  @ApiProperty({ default: 'test' })
  title: string;

  @ApiProperty({ default: [] })
  questions: Question[];
}
