import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { content, isAnonymous } = req.body;
    
    const post = new Post({
      content,
      isAnonymous,
      author: {
        id: req.user.id,
        name: req.user.name
      }
      
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ idPost: req.params.idPost });

    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (!post.isAnonymous && post.author.id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await Post.deleteOne({ idPost: req.params.idPost });
    await Comment.deleteMany({ postId: req.params.idPost });
    await Like.deleteMany({ postId: req.params.idPost });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};