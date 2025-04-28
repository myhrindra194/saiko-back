import mongoose from 'mongoose';
import Counter from './Counter.js';

const PostSchema = new mongoose.Schema({
  idPost: { type: Number, unique: true },
  content: { type: String, required: true, maxlength: 2000 },
  isAnonymous: { type: Boolean, default: false },
  author: {
    id: { type: String, required: true},
    name: { type: String, required: true }
  },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

PostSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'postId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.idPost = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Post', PostSchema);