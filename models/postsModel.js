const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("posts", postsSchema);