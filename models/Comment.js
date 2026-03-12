import mongoose from 'mongoose';
import Counter from './Counter.js';

const CommentSchema = new mongoose.Schema({
  commentId: { type: Number, unique: true, index: true },
  content: { type: String, required: true, maxlength: 1000 },
  isAnonymous: {type: Boolean, default: true},
  author: {
    id: { type: String, required: true, index: true },
    name: { type: String, required: true }
  },
  postId: { type: Number, required: true, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
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

// optional compound index for fast post comment lookup
CommentSchema.index({ postId: 1, createdAt: -1 });

export default mongoose.model('Comment', CommentSchema);