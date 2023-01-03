import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { decodeHeaders } from 'src/helpers';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;

    const { token, module } = decodeHeaders(bearerHeader);

    if (!bearerHeader || !token) {
      throw new ForbiddenException('V3 Auth - Invalid token');
    }

    const { accessToken, refreshToken } = await new AuthService({
      module,
    }).accessTokens(token);

    next();
    return { accessToken, refreshToken };
  }
  catch(error: Error) {
    console.error(error);
    throw new ForbiddenException('V3 Auth - ' + error.message);
  }
}
