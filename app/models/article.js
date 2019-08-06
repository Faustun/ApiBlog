const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const articleSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  type: { type: String, required: true },
  cover: { type: String },
  content: { type: String, required: true, select: false }
}, { timestamps: true });

module.exports = model('article', articleSchema);