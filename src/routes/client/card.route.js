const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/card.controller");

router.get("/", controller.index);
// router.get("/create", middleware, controller.create);
// router.post("/create", middleware, controller.store);
router.get("/:slugCategory", controller.detail);

module.exports = router;