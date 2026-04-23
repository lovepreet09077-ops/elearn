import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

export async function registerUser(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || "STUDENT",
    },
  });

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user || !user.passwordHash) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash, lastLoginAt: new Date() as any },
  }).catch(async () => {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash },
    });
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

export async function refreshUserToken(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user || !user.refreshTokenHash) {
    throw new Error("Invalid refresh token");
  }

  const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);

  if (!matches) {
    throw new Error("Invalid refresh token");
  }

  const newPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(newPayload);
  const newRefreshToken = signRefreshToken(newPayload);
  const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash: newRefreshTokenHash },
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logoutUser(userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshTokenHash: null },
  });
}