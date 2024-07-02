"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateNFC = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authenticateNFC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nfc_id, token } = req.body;
    console.log('Received NFC ID:', nfc_id);
    console.log('Received Token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Ajoutez ceci pour vérifier que le secret est chargé correctement
    try {
        const secret = process.env.JWT_SECRET;
        console.log('Using Secret:', secret);
        // Vérifiez le JWT en utilisant le secret
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log('Decoded JWT:', decoded);
        let user = yield userModel_1.default.findOne({ nfc_id });
        console.log('User found:', user);
        if (!user) {
            console.log('User not found with NFC ID:', nfc_id);
            return res.status(401).json({ message: 'Authentication failed' });
        }
        if (user.payload !== JSON.stringify(decoded)) {
            console.log('Payload mismatch. User payload:', user.payload, 'Decoded payload:', JSON.stringify(decoded));
            return res.status(401).json({ message: 'Authentication failed' });
        }
        console.log('Authentication successful');
        res.json({ message: 'Authentication successful', user });
    }
    catch (error) {
        console.error('Error during authentication:', error);
        res.status(401).json({ message: 'Authentication failed', error });
    }
});
exports.authenticateNFC = authenticateNFC;
