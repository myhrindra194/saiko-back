import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { content, isAnonymous = false } = req.body;
    
    const post = new Post({
      content,
      isAnonymous,
      author: {
        id: req.user.id,
        name: req.user.name
      },
      likes: []
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

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ idPost: req.params.postId });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ idPost: req.params.postId });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (post.author.id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    post.content = req.body.content || post.content;
    post.isAnonymous = req.body.isAnonymous ?? post.isAnonymous;
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ idPost: req.params.postId });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (post.author.id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Post.deleteOne({ idPost: req.params.postId });
    await Comment.deleteMany({ postId: req.params.postId });
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findOne({ idPost: req.params.postId });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json({ 
      liked: likeIndex === -1,
      likesCount: post.likes.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};