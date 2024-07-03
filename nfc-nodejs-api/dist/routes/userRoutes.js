"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/getAllUsers', userController_1.getAllUsers);
router.post('/createUser', userController_1.createUser);
exports.default = router;
