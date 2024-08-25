import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const refreshToken = getHeader(event, "Authorization")?.replace('Bearer ', '');

  if (refreshToken == null) {
    setResponseStatus(event, 401);
    return "refreshToken not present";
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      throw new Error("Unexpected string jwt");
    }

    if (decoded.type !== 'auth') {
      setResponseStatus(event, 401)
      return 'Wrong jwt type'
    }

    const userData = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, Number(decoded.sub)),
    });
    if (!userData) {
      setResponseStatus(event, 404);
      return;
    }

    setResponseStatus(event, 200);
    return { ...userData, password: undefined };
  } catch (e) {
    console.log(e)

    setResponseStatus(event, 401);
    return "Token Verification Failed!";
  }
});
