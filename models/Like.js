import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  postId: { type: Number, ref: 'Post', required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

LikeSchema.index({ postId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Like', LikeSchema);