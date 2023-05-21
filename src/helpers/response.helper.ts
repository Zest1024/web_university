import { ApiProperty } from '@nestjs/swagger';

class ResponseType {
  @ApiProperty()
  status: boolean;
}

export class SuccessResponseType<T> extends ResponseType {
  @ApiProperty()
  data?: T;
}

export class FailedResponseType extends ResponseType {
  @ApiProperty()
  errors?: Error[];
}

export const toSuccessResponse = <T>(data?: T): SuccessResponseType<T> => {
  return {
    status: true,
    data,
  };
};

export const toFailedResponse = (errors?: any[]): FailedResponseType => {
  return {
    status: false,
    errors: errors.map((error) => error.detail || error.message || error),
  };
};
