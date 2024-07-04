"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtUtils_1 = require("../utils/jwtUtils");
const router = express_1.default.Router();
// Example endpoint to handle NFC card authentication
router.post('/authenticate', (req, res) => {
    // Assume data sent by frontend API app contains the JWT token in req.body.token
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Perform additional checks if needed (e.g., verify user identity)
        // Simulate user information retrieval from decoded JWT
        const { name, email, role } = decoded;
        // Example: Check if user exists in database or perform other authentication logic
        // Generate a new JWT token to send back to the client
        const accessToken = (0, jwtUtils_1.generateToken)({ name, email, role });
        // Return the access token to the client
        res.json({ accessToken });
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Invalid token', error });
    }
});
exports.default = router;
