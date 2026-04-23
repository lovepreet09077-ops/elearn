export const env = {
  port: Number(process.env.PORT) || 4000,
  apiKey: process.env.API_KEY || "",
   jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  nodeEnv: process.env.NODE_ENV || "development",
};