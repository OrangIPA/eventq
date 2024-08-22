import argon2 from "argon2";
import { db } from "~/server/utils/db";
import { users } from "~/server/utils/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name || !body.email || !body.password) {
    setResponseStatus(event, 400);
    return "Bad Request";
  }

  db.insert(users).values({
    name: body.name,
    email: body.email,
    password: await argon2.hash(body.password),
  }).execute();

  setResponseStatus(event, 201);
  return "Hello Nitro";
});
