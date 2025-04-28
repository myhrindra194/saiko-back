import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 1000 },
  postId: { type: Number, ref: 'Post', required: true },
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', CommentSchema);