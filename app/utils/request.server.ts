import {StatusCodes} from "http-status-codes";
import {data} from "react-router";

/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(content: T) =>
  data(content, { status: StatusCodes.BAD_REQUEST });

/**
 * This helper function helps us to return the accurate HTTP status,
 * 500 Internal Server Error, to the client.
 */
export const internalServerError = <T>(content: T) =>
  data(content, { status: StatusCodes.INTERNAL_SERVER_ERROR });
