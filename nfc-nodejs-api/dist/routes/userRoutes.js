"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
<<<<<<< HEAD
router.get('/getAllUsers', userController_1.getAllUsers);
router.post('/createUser', userController_1.createUser);
=======
router.post('/add-user', userController_1.addUser);
>>>>>>> 1cb9da7403449d08a044c7cb0e7b24bf02c50285
exports.default = router;
