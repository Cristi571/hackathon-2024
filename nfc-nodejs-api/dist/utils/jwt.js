"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
