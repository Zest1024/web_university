import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const JwtAuth = () => applyDecorators(UseGuards(AuthGuard('jwt')));
