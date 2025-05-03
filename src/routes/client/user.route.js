const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const uploadImage = require("../../middlewares/client/upload.middleware");

router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
router.get("/login", controller.login); 
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgotPassword);
router.post("/password/forgot", validate.forgotPasswordPost, controller.forgotPasswordPost);
router.get("/password/otp", controller.otpPassword);
router.post("/password/otp", controller.otpPasswordPost);
router.get("/password/reset", controller.resetPassword);
router.post("/password/reset", validate.resetPasswordPost, controller.resetPasswordPost);
router.get("/info", authMiddleware.requireAuth, controller.info);
router.patch("/info/upload", authMiddleware.requireAuth, upload.single("avatar"), uploadImage.upload , controller.infoUpload);
router.patch("/info", controller.infoPatch);

module.exports = router;