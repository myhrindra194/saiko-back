import mongoose from 'mongoose';
import Counter from './Counter.js';

const CommentSchema = new mongoose.Schema({
  commentId: { type: Number, unique: true },
  content: { type: String, required: true, maxlength: 1000 },
  isAnonymous: {type: Boolean, default: true},
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  postId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

CommentSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'commentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.commentId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Comment', CommentSchema);