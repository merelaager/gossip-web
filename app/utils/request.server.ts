import {json} from "@remix-run/node";
import {StatusCodes} from "http-status-codes";

/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(data: T) =>
  json<T>(data, { status: StatusCodes.BAD_REQUEST });
