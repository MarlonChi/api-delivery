import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authconfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authorization header is missing", 401);
    }

    const [_, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authconfig.jwt.secret
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
}
