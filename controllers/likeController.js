import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const toggleLike = async (req, res) => {
  try {
    const { idPost } = req.params;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ postId: idPost, userId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Post.updateOne({ idPost }, { $inc: { likesCount: -1 } });
      return res.json({ liked: false });
    }

    await Like.create({ postId: idPost, userId });
    await Post.updateOne({ idPost }, { $inc: { likesCount: 1 } });
    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkLike = async (req, res) => {
  try {
    const like = await Like.findOne({
      postId: req.params.idPost,
      userId: req.user.id
    });
    res.json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};