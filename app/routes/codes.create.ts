import qs from "qs";
import { randomBytes } from "node:crypto";
import { StatusCodes } from "http-status-codes";
import { prisma } from "~/utils/db.server";
import type { ActionFunctionArgs } from "react-router";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.text();
  const parsed = qs.parse(body);
  if (typeof parsed === "undefined") {
    return StatusCodes.BAD_REQUEST;
  }

  const codeCountRaw = parsed.codeCount;
  if (typeof codeCountRaw !== "string") {
    return StatusCodes.BAD_REQUEST;
  }

  const codeCount = parseInt(codeCountRaw, 10);
  if (isNaN(codeCount) || codeCount <= 0) {
    return StatusCodes.BAD_REQUEST;
  }

  for (let i = 1; i < codeCount; i++) {
    let code = randomBytes(4).toString("base64");
    const exists = await prisma.inviteCode.count({
      where: { id: code },
    });
    if (exists) {
      continue;
    }
    await prisma.inviteCode.create({ data: { id: code } });
  }

  return StatusCodes.CREATED;
};
