const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/card.controller");

router.get("/:slugCategory", controller.listCard);

module.exports = router;