import {json} from "@remix-run/node";
import {StatusCodes} from "http-status-codes";

/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(data: T) =>
  json<T>(data, { status: StatusCodes.BAD_REQUEST });

/**
 * This helper function helps us to return the accurate HTTP status,
 * 500 Internal Server Error, to the client.
 */
export const internalServerError = <T>(data: T) =>
  json<T>(data, { status: StatusCodes.INTERNAL_SERVER_ERROR });
