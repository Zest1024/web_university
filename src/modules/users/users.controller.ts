import * as bcrypt from 'bcrypt';

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { User } from './users.entity';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.interface';
import { UsersService } from './users.service';

import {
  FailedResponseType,
  SuccessResponseType,
  toFailedResponse,
  toSuccessResponse,
} from '../../helpers/response.helper';
import { JwtAuthorizedRequest } from '../auth/auth.interface';
import { AuthService } from '../auth/auth.service';
import { JwtAuth } from '../auth/guards/jwt.guard';
import { QueueService } from '../queue/queue.service';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  private readonly passwordSalt: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly queueService: QueueService,
  ) {
    this.passwordSalt = this.configService.getOrThrow<string>('PASSWORD_SALT');
  }

  @Get()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get userData' })
  @ApiOkResponse({ type: SuccessResponseType<User> })
  getUser(@Req() req: JwtAuthorizedRequest) {
    return req.user;
  }

  @Post()
  @ApiOkResponse({ type: SuccessResponseType })
  @ApiOperation({ summary: 'Create user' })
  @ApiBadRequestResponse({ type: FailedResponseType })
  async createUser(
    @Body() { firstName, lastName, email, password }: CreateUserDto,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, this.passwordSalt);

      const user: User = {
        firstName,
        email,
        lastName,
        password: hashedPassword,
        password_salt: this.passwordSalt,
      };

      await this.userService.createUser(user);

      return toSuccessResponse();
    } catch (e) {
      throw new HttpException(toFailedResponse([e]), HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: SuccessResponseType<{ access_token: string }> })
  @ApiBadRequestResponse({ type: FailedResponseType })
  async login(@Body() { email, password }: LoginDto) {
    try {
      const user = await this.userService.findUser({
        email,
      });

      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        throw new Error(`Wrong password`);
      }
      const access_token = await this.authService.generateAccessToken({
        id: user.id,
      });

      await this.queueService.sendEmail({
        from: this.configService.getOrThrow<string>('MAILER_USERNAME'),
        to: user.email,
        subject: 'Logging in',
        text: 'You have been logged in',
      });

      return toSuccessResponse<{ access_token: string }>({
        access_token,
      });
    } catch (e) {
      throw new HttpException(toFailedResponse([e]), HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update user' })
  @ApiOkResponse({ type: SuccessResponseType })
  @ApiBadRequestResponse({ type: FailedResponseType })
  async updateUser(
    @Body() { id, firstName, lastName, password }: UpdateUserDto,
  ) {
    try {
      if (!id) {
        throw new Error('id is required');
      }
      const user: Partial<User> = { id };
      if (password) {
        user.password = await bcrypt.hash(password, this.passwordSalt);
        user.password_salt = this.passwordSalt;
      }
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }

      await this.userService.updateUser(user);
      return toSuccessResponse();
    } catch (e) {
      throw new HttpException(toFailedResponse([e]), HttpStatus.BAD_REQUEST);
    }
  }
}
