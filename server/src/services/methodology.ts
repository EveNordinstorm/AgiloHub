import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const getAllMethodologies = async () => {
  return prisma.methodology.findMany({
    orderBy: { name: "desc" },
  });
};
