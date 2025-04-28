import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const post = await Post.findOne({ idPost: postId });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = new Comment({
      content,
      postId: post.idPost,
      author: {
        id: req.user.id,
        name: req.user.name
      }
    });

    await comment.save();
    
    await Post.updateOne(
      { idPost: postId },
      { $push: { comments: comment.commentId } }
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};