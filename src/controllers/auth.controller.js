const {
  handleError,
  succesMessage,
} = require("../helpers/res.error.succes.js");
const prisma = require("../prisma/clent.js");
const Crypto = require("../utils/hashed.js");
const {
  createUserValidator,
  updateUserValidator,
  loginUserValidator,
  signinUserValidator,
  changePasswordUserValidator,
} = require("../validator/auth.validator.js");
const {
  generateRefreshToken,
  generateAccessToken,
  verifyToken,
} = require("../utils/token.js");
const config = require("../config/app.js");
const NodeCache = require("node-cache");
const generetOTP = require("../helpers/generate-OTP.js");
const sendMailPromise = require("../helpers/send-mails.js");

const crypto = new Crypto();
const cache = new NodeCache();

class UserController {
  async getAllUsers(_, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return succesMessage(res, users);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async createUser(req, res) {
    try {
      const { value, error } = createUserValidator(req.body);
      if (error) {
        return handleError(res, error);
      }
      const { fullName, email, password, role } = value;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return handleError(res, "User already exists", 400);

      const hashed = await crypto.encrypt(password);

      const newUser = await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashed,
          role: role || "USER",
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return succesMessage(res, newUser, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async loginUser(req, res) {
    try {
      const { value, error } = loginUserValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const email = value.email;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return handleError(res, "Admin not found", 404);
      }

      // Parolni solishtiramiz
      const pass = await crypto.compare(value.password, user.password);
      if (!pass) {
        return handleError(res, "Invalid password", 401);
      }

      // Tokenlar yaratamiz
      const payload = { id: user.id, role: user.role };
      const accesToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);

      // Cookiega refresh token
      res.cookie("refreshTokenUser", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 kun
      });

      return succesMessage(
        res,
        {
          data: user,
          token: accesToken,
        },
        200
      );
    } catch (error) {
      return handleError(res, error);
    }
  }
  async newAccesToken(req, res) {
    try {
      const refreshToken = req.cookies?.refreshTokenUser;
      if (!refreshToken) {
        return handleError(res, "Refresh token expired", 400);
      }
      const decodedToken = await verifyToken(
        refreshToken,
        config.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        return handleError(res, "Invalid token", 400);
      }
      const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
      });
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      const payload = { id: user.id, role: user.role };
      const accessToken = await generateAccessToken(payload);
      return succesMessage(res, { token: accessToken });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async forgotPassword(req, res) {
    try {
      const { value, error } = signinUserValidator(req.body);
      if (error) return handleError(res, error, 422);
      const email = value.email;
      const existing = await prisma.user.findUnique({ where: { email } });
      if (!existing) return handleError(res, "User not found", 404);
      const otp = generetOTP();
      const mailOptions = {
        from: config.MAIL_USER,
        to: email,
        subject: "Asra devs dan",
        text: otp,
      };
      await sendMailPromise(mailOptions);
      cache.set(email, otp, 120);
      return succesMessage(res, `Email sent successfully. OTP: ${otp}`);
    } catch (error) {
      console.error("Email yuborishda xatolik:", error);
      return handleError(res, "Error sended on email", 400);
    }
  }
  async changePassword(req, res) {
    try {
      const { value, error } = changePasswordUserValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const { email, password, otp } = value;
      const cacheOTP = cache.get(email);
      if (!cacheOTP || cacheOTP != otp) {
        return handleError(res, "OTP expired", 400);
      }
      let updateData = { email, password };
      if (password) {
        const hashed = await crypto.encrypt(password);
        updateData.password = hashed;
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: updateData,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          updatedAt: true,
        },
      });
      return succesMessage(res, { data: updatedUser });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        return handleError(res, "User not found", 404);
      }
      return succesMessage(res, user);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getMe(req, res) {
    try {
      const id = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      return succesMessage(res, user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updatedUser(req, res) {
    try {
      const { value, error } = updateUserValidator(req.body);
      if (error) {
        return handleError(res, error);
      }
      const { fullName, email, password, role } = value;
      const id = req.params.id;
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        return handleError(res, "User not found", 400);
      }

      let updateData = { fullName, email, role };
      if (password) {
        const hashed = await crypto.encrypt(password);
        updateData.password = hashed;
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          updatedAt: true,
        },
      });

      return succesMessage(res, updatedUser);
    } catch (error) {
      return handleError(res, error);
    }
  }
  async updateMe(req, res) {
    try {
      const { value, error } = updateUserValidator(req.body);
      if (error) return handleError(res, error, 422);
      const id = req.user.id;
      const { fullName, email, password } = value;
      let updateData = { fullName, email };
      if (password) {
        const hashed = await crypto.encrypt(password);
        updateData.password = hashed;
      }
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          updatedAt: true,
        },
      });

      return succesMessage(res, updatedUser);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!existingUser) {
        return handleError(res, "User not found", 400);
      }

      await prisma.user.delete({ where: { id: req.params.id } });
      return succesMessage(res, "Deleted User");
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new UserController();
