import { Request, Response } from "express";
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
} from "./auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const result = await registerUser({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const result = await loginUser({ email, password });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "refreshToken is required",
      });
    }

    const result = await refreshUserToken(refreshToken);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Token refresh failed",
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await logoutUser(userId);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch {
    return res.status(500).json({ message: "Logout failed" });
  }
}