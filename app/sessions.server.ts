import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
  token: string;
  name: string;
};

type SessionFlashData = {
  error: string;
};
const domain = process.env.NODE_ENV === "production" ? "reactrouter.com" : "localhost";
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",

        // all of these are optional
        //domain: "reactrouter.com",
        //domain: "localhost",
        domain: domain,
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1, // 1 day
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };
