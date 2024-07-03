"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nfcController_1 = require("../controllers/nfcController");
const router = (0, express_1.Router)();
router.post('/authenticate', nfcController_1.authenticateNFC);
exports.default = router;
