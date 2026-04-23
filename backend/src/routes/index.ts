import { Router } from "express";
import { prisma } from "../config/db";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: true });
  } catch {
    res.status(500).json({ ok: false, db: false });
  }
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;