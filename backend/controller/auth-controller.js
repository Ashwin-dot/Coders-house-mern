const otpServices = require("../services/otp-services");
const hashService = require("../services/hash-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone Field is required!" });
    }

    const otp = await otpServices.generateOtp();

    //hash
    const ttl = 1000 * 60 * 2; //2mins
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = hashService.hashOtp(data);

    //send otp
    try {
      // await otpServices.sendBySms(phone, otp);
      return res.json({
        message: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "message sending field" });
    }
  }
  async verifyOtp(req, res) {
    const { otp, phone, hash } = req.body;
    if (!otp || !phone || !hash) {
      res.status(400).json({
        message: "All filds are required",
      });
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({
        message: "Code is expired",
      });
    }
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpServices.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json({
        message: "Code is invalid",
      });
    }
    let user;
    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "DB connect error" });
    }
    //token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });
    res.cookie("refereshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({ accessToken });
  }
}

module.exports = new AuthController();
