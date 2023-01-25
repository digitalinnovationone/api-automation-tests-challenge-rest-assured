"use strict";
const guards_1 = require("./guards");
const users_1 = require("./users");
// @ts-ignore shut the compiler up about defining in two steps
const middlewares = [users_1.default, guards_1.default];
Object.defineProperty(middlewares, 'rewriter', { value: guards_1.rewriter, enumerable: false });
module.exports = middlewares;
