import { ApiProperty } from '@nestjs/swagger';

export class CreateChoiceDto {
  @ApiProperty({ default: 'test' })
  title?: string;

  @ApiProperty({ default: false })
  isCorrectChoice?: boolean;

  @ApiProperty({ default: { id: 'uuid' } })
  question?: { id: string };
}

export class AnswerChoices {
  @ApiProperty({ default: 'uuid' })
  id?: string;
}
