// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Error: DATABASE_URL is not defined in your .env file");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔄 Resetting database data...");

  try {
    // 1. Delete all existing data
    await prisma.note.deleteMany({});
    await prisma.group.deleteMany({});

    // 2. Reset ID counters (Restart at 1)
    // Note: These might fail if the sequence names differ, so we wrap them
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE IF EXISTS "Note_id_seq" RESTART WITH 1;`,
    );
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE IF EXISTS "Group_id_seq" RESTART WITH 1;`,
    );

    console.log("🌱 Seeding fresh data...");

    // 3. Seed Groups
    await prisma.group.createMany({
      data: [
        { id: 1, name: "personal", color: "#FF746C" },
        { id: 2, name: "professional", color: "#82C8E5" },
        { id: 3, name: "misc", color: "#FFBF00" },
      ],
    });

    // 4. Seed Notes
    await prisma.note.createMany({
      data: [
        { id: 1, label: "Jays Note", text: "this is Jays note" },
        { id: 2, label: "Lorem Ipsum", text: "Lorem ipsum dolor sit amet..." },
        { id: 3, label: "Untitled", text: "" },
        { id: 4, label: "sfafsad", text: "a a a a a..." },
      ],
    });

    // 5. Synchronize sequences with the manual IDs we just inserted
    // We use COALESCE to handle cases where the table might be empty (though not here)
    await prisma.$executeRawUnsafe(
      `SELECT setval('"Note_id_seq"', COALESCE((SELECT MAX(id) FROM "Note"), 1), true);`,
    );
    await prisma.$executeRawUnsafe(
      `SELECT setval('"Group_id_seq"', COALESCE((SELECT MAX(id) FROM "Group"), 1), true);`,
    );

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error; // Re-throw to ensure the process exits with code 1
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
