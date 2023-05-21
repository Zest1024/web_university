import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../auth.interface';
import { AuthService } from '../auth.service';
import { STRATEGIES } from '../constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGIES.JWT) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.userService.findUser({
      id,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
