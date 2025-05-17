const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/test.controller");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const validate = require("../../validates/client/do-test.validate");

router.get("/", controller.index);
router.get("/create", authMiddleware.requireAuth, controller.create);
router.post("/create", authMiddleware.requireAuth, validate.createPost, controller.createPost);

module.exports = router;