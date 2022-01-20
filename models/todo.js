const { Schema, model } = require("mongoose");

// sub-document
const photoSchema = new Schema({
  url: { type: String },
});


const todoSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    photos: [photoSchema],
  },
  { timestamps: true }
);



const todo = model("Todo", todoSchema);
exports.Todo = todo;
