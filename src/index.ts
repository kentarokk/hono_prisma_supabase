import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono();

export const getPrisma = () => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  return prisma;
};

app.get("/", (c) => {
  return c.text("Hello Hono!");
  // return c.json({ message: c.env.DATABASE_URL as string });
});

app.get("/users", async (c) => {
  const prisma = getPrisma();
  const users = await prisma.user.findMany();
  await prisma.$disconnect();
  return c.json(users);
});

export default app;
