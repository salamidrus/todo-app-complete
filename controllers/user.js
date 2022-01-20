const { User } = require("../models/user");
const { compare } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

class UserControllers {
  static getAll = async (req, res, next) => {
    try {
      const data = await User.find().populate("todo", "name");

      res.status(200).json({
        success: true,
        message: "Successfully Retrieve Data!",
        data,
      });
    } catch (err) {
      //   err.status = 500;
      next(err);
    }
  };

  static view = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.findById(id);

      res.status(200).json({
        success: true,
        message: "Successfully Retrieve Data!",
        data,
      });
    } catch (err) {
      //   err.status = 500;
      next(err);
    }
  };

  static register = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      let avatar;
      if (req.file && req.file.path) {
        avatar = req.file.path;
      }

      const data = await User.create({
        username,
        password,
        avatar,
        // avatar: req.file && req.file.filename ? req.file.filename : null,
      });

      res.status(200).json({
        success: true,
        message: "Successfully Create Data!",
        data,
      });
    } catch (err) {
      //   err.status = 500;
      next(err);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user)
        return res.status(400).json({
          success: false,
          message: "User not found!",
        });

      const checkPassword = compare(password, user.password);

      if (!checkPassword)
        return res.status(400).json({
          success: false,
          message: "Incorrect Password!",
        });

      const payload = {
        id: user.id,
        username: user.username,
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY);

      res.status(200).json({
        success: true,
        message: "Successfully Login!",
        token,
      });
    } catch (err) {
      //   err.status = 500;
      next(err);
    }
  };

  static edit = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { username, password } = req.body;
      let avatar = null;
      if (req.file && req.file.filename) avatar = req.file.filename;

      // ----- dynamic update -------
      const updatedData = {};
      if (username) updatedData.username = username;
      if (password) updatedData.password = password;
      if (avatar) updatedData.avatar = avatar;
      // ----------------------------

      // for (let key in req.body) {
      //   if (updatedData[key]) updatedData[key] = req.body[key]
      // }

      const data = await User.findByIdAndUpdate(
        id,
        {
          $set: updatedData,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Successfully Update Data!",
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully Delete Data!",
        data,
      });
    } catch (err) {
      //   err.status = 500;
      next(err);
    }
  };
}

module.exports = UserControllers;
