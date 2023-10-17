import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const date = new Date();
async function main() {
  const alice = await prisma.patient.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      firstname: "Alice",
      lastname: "Cooper",
      createdAt: date.toISOString(),
      updatedAt: undefined,
      birthdate: date.toISOString(),
      reports: {
        create: {
          status: true,
        },
      },
    },
  });
  const bob = await prisma.patient.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      firstname: "Bobi",
      lastname: "Maryerlin",
      createdAt: date.toISOString(),
      updatedAt: undefined,
      birthdate: date.toISOString(),
      reports: {
        create: {
          status: true,
        },
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
