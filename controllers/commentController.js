import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { idPost } = req.params;

    const comment = new Comment({
      content,
      postId: idPost,
      author: {
        id: req.user.id,
        name: req.user.name
      }
    });

    await comment.save();
    await Post.updateOne(
      { idPost },
      { $inc: { commentsCount: 1 } }
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.idPost })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};