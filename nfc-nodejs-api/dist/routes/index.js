"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./src/routes/router.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const router = express_1.default.Router();
// Set the user routes on /user
router.use('/api/users', userRoutes_1.default);
router.use('/api/auth', authRoutes_1.default);
// Export main routeur
exports.default = router;
