import { User } from '../users/users.entity';

export class JwtPayload {
  id: string;
}

export class JwtAuthorizedRequest {
  user: User;
}
