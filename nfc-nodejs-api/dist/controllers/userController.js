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
exports.addUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const cryptoUtils_1 = require("../utils/cryptoUtils");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nfc_id, payload } = req.body;
    if (!nfc_id || !payload) {
        return res.status(400).json({ message: 'nfc_id and payload are required' });
    }
    try {
        const encryptedPayload = (0, cryptoUtils_1.encrypt)(JSON.stringify(payload));
        const user = new userModel_1.default({ nfc_id, payload: JSON.stringify(encryptedPayload) });
        yield user.save();
        res.status(201).json({ message: 'User added successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});
exports.addUser = addUser;
