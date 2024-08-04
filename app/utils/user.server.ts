import * as argon2 from "argon2";
import type { RegisterForm } from "./types.server";

import { prisma } from "./db.server";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await argon2.hash(user.password);

  const fetchCode = await prisma.inviteCode.findUnique({
    where: { id: user.inviteCode },
  });

  if (!fetchCode) {
    return { error: "Vigane kood" };
  }

  if (fetchCode.used) {
    return { error: "Kood on juba kasutatud" };
  }

  const newUser = await prisma.user.create({
    data: {
      username: user.username.toLocaleLowerCase("et"),
      password: passwordHash,
      shift: fetchCode.shift,
    },
  });

  // Expire the invite code.
  await prisma.inviteCode.update({
    data: { used: true },
    where: { id: fetchCode.id },
  });

  return { id: newUser.id, username: newUser.username };
};
