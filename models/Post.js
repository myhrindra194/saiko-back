import mongoose from 'mongoose';
import Counter from './Counter.js';

const PostSchema = new mongoose.Schema({
  idPost: { type: Number, unique: true, index: true },
  content: { type: String, required: true, maxlength: 2000 },
  isAnonymous: { type: Boolean, default: false },
  author: {
    id: { type: String, required: true, index: true },
    name: { type: String, required: true }
  },
  likes: [{ type: String }],
  comments: [{ type: Number, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now, index: true }
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

// additional compound index example: speed up queries by author + date
PostSchema.index({ 'author.id': 1, createdAt: -1 });

export default mongoose.model('Post', PostSchema);