const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    articleId: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = model('comment', commentSchema);