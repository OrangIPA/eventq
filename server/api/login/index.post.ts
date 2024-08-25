import argon from "argon2";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const userQuery = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, body.email),
  });

  if (!userQuery) {
    setResponseStatus(event, 401);
    return "Invalid username or password";
  }

  const authorized = await argon.verify(userQuery.password, body.password);
  try {
  } catch (e) {
    console.log(e);
  }

  if (!authorized) {
    setResponseStatus(event, 401);
    return "Invalid username or password";
  }

  const iat = Math.floor(Date.now() / 1000);

  const claims = {
    sub: userQuery.id,
    iat: iat,
    nbf: iat,
    type: "refresh",
  };

  const token = jwt.sign(claims, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "2w",
  });

  setCookie(event, "refresh_token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  return "";
});
