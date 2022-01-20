const { Schema, model } = require("mongoose");
const { hash } = require("../helpers/bcrypt");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://res.cloudinary.com/di02ey9t7/image/upload/v1642595798/GA/user_edsw29.png"},
    todo: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

// Hooks
userSchema.pre("save", function (next) {
  this.password = hash(this.password);
  next();
});

const user = model("User", userSchema);
exports.User = user;
