/// <reference types="connect" />
import { ErrorRequestHandler, Handler } from 'express';
/**
 * Use same body-parser options as json-server
 */
export declare const bodyParsingHandler: import("connect").NextHandleFunction[];
/**
 * Json error handler
 */
export declare const errorHandler: ErrorRequestHandler;
/**
 * Just executes the next middleware,
 * to pass directly the request to the json-server router
 */
export declare const goNext: Handler;
/**
 * Look for a property in the request body and reject the request if found
 */
export declare function forbidUpdateOn(...forbiddenBodyParams: string[]): Handler;
declare type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
/**
 * Reject the request for a given method
 */
export declare function forbidMethod(method: RequestMethod): Handler;
export {};
