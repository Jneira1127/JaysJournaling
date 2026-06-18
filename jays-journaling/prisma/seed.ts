// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
import path from "path";

// 1. Load environment variables from .env
dotenv.config({ path: path.join(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your .env file");
}

// 2. Setup the adapter (matching your src/lib/db.ts logic)
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔄 Resetting database data...");

  // 3. Delete all existing data
  await prisma.note.deleteMany({});
  await prisma.group.deleteMany({});

  // 4. Reset ID counters
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Note_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Group_id_seq" RESTART WITH 1;`,
  );

  console.log("🌱 Seeding fresh data...");

  // 5. Seed Groups
  await prisma.group.createMany({
    data: [
      { id: 1, name: "personal", color: "#FF746C" },
      { id: 2, name: "professional", color: "#82C8E5" },
      { id: 3, name: "misc", color: "#FFBF00" },
    ],
  });

  // 6. Seed the 4 Preset Notes
  await prisma.note.createMany({
    data: [
      {
        id: 1,
        label: "Jays Note",
        text: "this is Jays note",
      },
      {
        id: 2,
        label: "Lorem Ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: 3,
        label: "Untitled",
        text: "",
      },
      {
        id: 4,
        label: "sfafsad",
        text: "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a",
      },
    ],
  });

  await prisma.$executeRawUnsafe(
    `SELECT setval('"Note_id_seq"', (SELECT MAX(id) FROM "Note"));`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Group_id_seq"', (SELECT MAX(id) FROM "Group"));`,
  );

  console.log("✅ Database reset and seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Important to close the pool so the script exits
  });
