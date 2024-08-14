import type { LoginForm, RegisterForm } from "./types.server";

import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";

import { prisma } from "./db.server";
import { createUser } from "./user.server";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "ml-gossip",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const session = await getUserSession(request);

  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

async function getUserId(request: Request) {
  const session = await getUserSession(request);

  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({
    where: { username: user.username },
  });

  if (exists) {
    return json(
      { error: `Kasutajanimi on juba kasutuses` },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const newUser = await createUser(user);
  if (newUser.error) {
    return json(
      {
        error: newUser.error,
        fields: {
          username: user.username,
          password: user.password,
          inviteCode: user.inviteCode,
        },
      },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  return createUserSession(`${newUser.id}`, "/");
}

export async function login({ username, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await argon2.verify(user.password, password)))
    return json(
      { error: `Vigane kasutajanimi või salasõna` },
      { status: StatusCodes.BAD_REQUEST },
    );

  return createUserSession(`${user.id}`, "/");
}
