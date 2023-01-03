import { Injectable, ForbiddenException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './interfaces/authPayload.interface';

const {
  AUTH_PERMITTED_MODULES,
  AUTH_ACCESS_TOKEN_SECRET,
  AUTH_ACCESS_TOKEN_SECRET_EXPIRY,
  AUTH_REFRESH_TOKEN_SECRET,
  AUTH_REFRESH_TOKEN_SECRET_EXPIRY,
} = process.env;

@Injectable()
export class AuthService {
  constructor(private readonly jwtPayload?: AccessTokenPayload) {}

  createAccessToken({ module }: AccessTokenPayload): string {
    return sign({ module }, AUTH_ACCESS_TOKEN_SECRET, {
      expiresIn: AUTH_ACCESS_TOKEN_SECRET_EXPIRY,
    });
  }

  createRefreshToken({ module }: RefreshTokenPayload): string {
    return sign({ module }, AUTH_REFRESH_TOKEN_SECRET, {
      expiresIn: AUTH_REFRESH_TOKEN_SECRET_EXPIRY,
    });
  }

  assignTokens(module: string) {
    return {
      accessToken: this.createAccessToken({ module }),
      refreshToken: this.createRefreshToken({ module }),
    };
  }

  async accessTokens(accessToken: string) {
    const decodedAccessToken: any = verify(accessToken, AUTH_ACCESS_TOKEN_SECRET);

    const { jwtPayload } = this;

    const permittedModules = AUTH_PERMITTED_MODULES.split(',');

    if (!jwtPayload || !permittedModules.includes(decodedAccessToken.module)) {
      throw new ForbiddenException('Unauthorized access');
    }

    const { module } = jwtPayload;

    const tokens = this.assignTokens(module);

    const authentication = {
      module,
      ...tokens,
    };

    return authentication;
  }
}
