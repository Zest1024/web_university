import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ default: 'test' })
  title: string;

  @ApiProperty({ default: false })
  multiple: boolean;

  @ApiProperty({ default: { id: 'uuid' } })
  quiz: { id: string };
}
