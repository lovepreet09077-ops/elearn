import { prisma } from "../../config/db";

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createUser(data: { email: string; name?: string }) {
  return prisma.user.create({
    data,
  });
}