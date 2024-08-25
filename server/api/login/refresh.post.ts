import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");

  if (refreshToken == null) {
    setResponseStatus(event, 401);
    return "refreshToken not present";
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      throw new Error("Unexpected string jwt");
    }

    const payload = {
      ...decoded,
      type: "auth",
      exp: undefined,
    };
    delete payload.exp

    const authToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });

    setResponseStatus(event, 200);
    return authToken;
  } catch (e) {
    setResponseStatus(event, 401);
    console.log(e);
    return "Token Verification Failed!";
  }
});
