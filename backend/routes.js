const routes = require("express").Router();
const authController = require("./controller/auth-controller.js");

routes.post("/api/send-otp", authController.sendOtp);
routes.post("/api/verify-otp", authController.verifyOtp);

module.exports = routes;
