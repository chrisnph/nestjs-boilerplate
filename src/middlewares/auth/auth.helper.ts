import { ForbiddenException } from '@nestjs/common';
import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';

config({ path: `${process.cwd()}/environments/.env` });

const { AUTH_ACCESS_TOKEN_SECRET } = process.env;

export const decodeHeaders = (bearerHeader) => {
  try {
    if (!bearerHeader)
      throw new ForbiddenException('V3 Auth - Unauthorized Access');

    const token = bearerHeader.split(' ')[1];

    return {
      token,
      module: {
        ...(verify(token, AUTH_ACCESS_TOKEN_SECRET) as any),
      }.module,
    };
  } catch (error) {
    throw new ForbiddenException('V3 Auth - ' + error.message);
  }
};
