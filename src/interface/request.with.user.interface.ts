import { Request } from 'express';
import { User } from 'src/entity/profile/user.entity';

export interface AuthenticatedRequest extends Request {
  user?: User;
}
