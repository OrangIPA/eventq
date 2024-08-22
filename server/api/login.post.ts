import argon from "argon2";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, body.email),
  });

  if (!result) {
    setResponseStatus(event, 401);
    return "Invalid username or password";
  }

  const authorized = await argon.verify(result.password, body.password);
  try {
  } catch (e) {
    console.log(e);
  }

  return authorized;
});
