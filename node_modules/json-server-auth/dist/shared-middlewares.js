"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidMethod = exports.forbidUpdateOn = exports.goNext = exports.errorHandler = exports.bodyParsingHandler = void 0;
const express_1 = require("express");
/**
 * Use same body-parser options as json-server
 */
exports.bodyParsingHandler = [express_1.json({ limit: '10mb' }), express_1.urlencoded({ extended: false })];
/**
 * Json error handler
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).jsonp(err.message);
};
exports.errorHandler = errorHandler;
/**
 * Just executes the next middleware,
 * to pass directly the request to the json-server router
 */
const goNext = (req, res, next) => {
    next();
};
exports.goNext = goNext;
/**
 * Look for a property in the request body and reject the request if found
 */
function forbidUpdateOn(...forbiddenBodyParams) {
    return (req, res, next) => {
        const bodyParams = Object.keys(req.body);
        const hasForbiddenParam = bodyParams.some(forbiddenBodyParams.includes);
        if (hasForbiddenParam) {
            res.status(403).jsonp(`Forbidden update on: ${forbiddenBodyParams.join(', ')}`);
        }
        else {
            next();
        }
    };
}
exports.forbidUpdateOn = forbidUpdateOn;
/**
 * Reject the request for a given method
 */
function forbidMethod(method) {
    return (req, res, next) => {
        if (req.method === method) {
            res.sendStatus(405);
        }
        else {
            next();
        }
    };
}
exports.forbidMethod = forbidMethod;
