const { Todo } = require("../models/todo");
const { User } = require("../models/user");

class TodoControllers {
  static getAll = async (req, res, next) => {
    try {
      const data = await Todo.find().populate("userId", "_id username");

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
      const data = await Todo.findById(id).populate("userId", "_id username");

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

  static create = async (req, res, next) => {
    try {
      let photos = [];
      if (req.files.length) {
        photos = req.files.map((el) => {
          return { url: el.path };
        });
      }

      const { name } = req.body;
      const { id } = req.decoded;

      const data = await Todo.create({ name, userId: id, photos });

      // push Todo id to User who created the todo
      await User.findByIdAndUpdate(id, {
        $push: {
          todo: data.id,
        },
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

  static edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // ----- dynamic update -------
      //   const updatedData = {};
      //   if (username) updatedData.username = username;
      //   if (password) updatedData.password = password;
      // ----------------------------

      const data = await Todo.findByIdAndUpdate(
        id,
        {
          $set: { name },
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

  static destroy = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Todo.findByIdAndDelete(id);

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

module.exports = TodoControllers;
