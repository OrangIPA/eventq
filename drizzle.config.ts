import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/utils/db/schema.ts',
  dbCredentials: {
    url: process.env.DB_URL!
  }
})