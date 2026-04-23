import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { verifyAccessToken } from "../utils/jwt";
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: string;
      };
    }
  }
}
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.header("x-api-key");

  if (!env.apiKey) {
    return res.status(500).json({
      message: "Server API key is not configured",
    });
  }

  if (!apiKey || apiKey !== env.apiKey) {
    return res.status(401).json({
      message: "Unauthorized: invalid or missing API key",
    });
  }

  next();
}