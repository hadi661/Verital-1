// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const TeamMember = require('../models/teams');
const Division = require('../models/division');
const Contact = require('../models/contact');
const Profil = require('../models/profil');
const About = require('../models/about');
const Slide = require('../models/slide');
const Service = require('../models/services');

// Read all blog articles (overview)
router.get('/', async (req, res) => {
    try {
        const newsData = await Blog.find().sort({ date: -1 });

        // Fetch other data as needed (e.g., for sidebar or header)
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profilData = await Profil.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const services = await Service.find();

        res.render('news', { 
            newsData, 
            services, 
            divisions 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read a single blog article
router.get('/:id', async (req, res) => {
    try {
        const article = await Blog.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Fetch other data as needed (e.g., for sidebar or header)
        const newsData = await Blog.find().sort({ date: -1 });
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profilData = await Profil.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const services = await Service.find();

        res.render('blog', { 
            article, 
            newsData,
            services, 
            divisions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
// Add a comment
router.post('/:id/comment', async (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({ message: 'User and text are required' });
    }
    try {
      const article = await Blog.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      const newComment = { user, text };
      article.comments.push(newComment);
      await article.save();
      res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error('Error adding comment:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Add a reaction to an article
  router.post('/:id/react', async (req, res) => {
    const { type } = req.body;
    if (!type || (type !== 'like' && type !== 'dislike')) {
      return res.status(400).json({ message: 'Valid reaction type is required' });
    }
    try {
      const article = await Blog.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      if (type === 'like') {
        article.reactions.likes += 1;
      } else if (type === 'dislike') {
        article.reactions.dislikes += 1;
      }
      await article.save();
      res.status(200).json({ message: 'Reaction added successfully' });
    } catch (err) {
      console.error('Error adding reaction:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
// Reply to a comment
router.post('/:articleId/comments/:commentId/reply', async (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
        return res.status(400).json({ message: 'User and text are required' });
    }
    try {
        const article = await Blog.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const comment = article.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        const newReply = { user, text };
        comment.replies.push(newReply);
        await article.save();
        res.status(200).json({ message: 'Reply added successfully' });
    } catch (err) {
        console.error('Error adding reply:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Like or dislike a comment
router.post('/:articleId/comments/:commentId/like', async (req, res) => {
    try {
        const article = await Blog.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const comment = article.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // Increment likes for the comment
        comment.reactions.likes += 1;
        await article.save();
        res.status(200).json({ message: 'Comment liked successfully' });
    } catch (err) {
        console.error('Error liking comment:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/:articleId/comments/:commentId/dislike', async (req, res) => {
    try {
        const article = await Blog.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const comment = article.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // Increment dislikes for the comment
        comment.reactions.dislikes += 1;
        await article.save();
        res.status(200).json({ message: 'Comment disliked successfully' });
    } catch (err) {
        console.error('Error disliking comment:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;