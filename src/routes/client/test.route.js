const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/test.controller");

router.get("/", controller.index);
// router.get("/create", middleware, controller.create);
router.get("/create", controller.create);

module.exports = router;