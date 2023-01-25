"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_PASSWORD_LENGTH = exports.EMAIL_REGEX = exports.SALT_LENGTH = exports.JWT_EXPIRES_IN = exports.JWT_SECRET_KEY = void 0;
exports.JWT_SECRET_KEY = 'json-server-auth-123456';
exports.JWT_EXPIRES_IN = '1h';
exports.SALT_LENGTH = 10;
exports.EMAIL_REGEX = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
exports.MIN_PASSWORD_LENGTH = 4;
