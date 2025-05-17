const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/test.controller");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/", controller.index);
router.get("/create", authMiddleware.requireAuth, controller.create);
router.post("/create", authMiddleware.requireAuth, controller.createPost);

module.exports = router;