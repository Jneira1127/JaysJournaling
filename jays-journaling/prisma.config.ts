import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// This ensures it looks for the .env file in your project root
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});