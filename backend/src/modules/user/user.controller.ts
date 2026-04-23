import { Request, Response } from "express";
import { createUser, getUsers } from "./user.service";

export async function listUsers(_req: Request, res: Response) {
  const users = await getUsers();
  res.json(users);
}

export async function addUser(req: Request, res: Response) {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const user = await createUser({ email, name });
  return res.status(201).json(user);
}