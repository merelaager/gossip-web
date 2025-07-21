import * as argon2 from "argon2";
import { CrockfordBase32 } from "crockford-base32";
import type { SetPasswordForm } from "./types.server";

import { prisma } from "./db.server";

export const createUser = async (
  username: string,
  password: string,
  inviteCode: string,
) => {
  const passwordHash = await argon2.hash(password);

  let rawToken = "";

  try {
    rawToken = CrockfordBase32.decode(inviteCode, {
      asNumber: true,
    }).toString();
  } catch (error) {
    return { error: "Vigane kood" };
  }

  const registrationInfo = await prisma.inviteCode.findUnique({
    where: { id: rawToken },
  });

  if (!registrationInfo) {
    return { error: "Vigane kood" };
  }

  if (registrationInfo.used) {
    return { error: "Koodi on juba kasutatud" };
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: passwordHash,
      shift: registrationInfo.shift,
      name: registrationInfo.name,
      role: registrationInfo.role,
    },
  });

  // Expire the invite code.
  await prisma.inviteCode.update({
    data: { used: true },
    where: { id: registrationInfo.id },
  });

  return { id: newUser.id, username: newUser.username };
};

export const setUserPassword = async (user: SetPasswordForm) => {
  const passwordHash = await argon2.hash(user.password);

  await prisma.user.update({
    where: { id: user.userId },
    data: { password: passwordHash },
  });

  return true;
};
