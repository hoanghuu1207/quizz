const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/test.controller");

router.get("/", controller.index);
router.get("/create", controller.create); // required middleware
router.post("/create", controller.createPost); // required middleware

module.exports = router;