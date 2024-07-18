const express = require('express');
const router = express.Router();
const Slide = require('../models/slide');
const Division = require('../models/division');
const TeamMember = require('../models/teams');
const Contact = require('../models/contact');
const Profil = require('../models/profil');
const About = require('../models/about');
const Service = require('../models/services');
const News = require('../models/news');  
const connectDB = require('../config/db');

// Read all news articles
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;
        const newsData = await News.find().sort({ date: -1 }).skip(skip).limit(limit);
        const count = await News.countDocuments();

        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profilData = await Profil.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const services = await Service.find();

        const totalPages = Math.ceil(count / limit);

        res.render('news', { 
            newsData, 
            services, 
            divisions, 
            currentPage: page, 
            totalPages 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.render('blog', { article: news });
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
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        const newComment = { user, text };
        news.comments.push(newComment);
        await news.save();
        res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/:id/react', async (req, res) => {
    const { type } = req.body;
    if (!type || (type !== 'like' && type !== 'dislike')) {
        return res.status(400).json({ message: 'Valid reaction type is required' });
    }
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        if (type === 'like') {
            news.reactions.likes += 1;
        } else if (type === 'dislike') {
            news.reactions.dislikes += 1;
        }
        await news.save();
        res.status(200).json({ message: 'Reaction added successfully' });
    } catch (err) {
        console.error('Error adding reaction:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});
//  news article (admin)
router.put('/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.redirect('/admin/news');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a news article (admin)
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.redirect('/admin/news');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Admin page to manage news articles
router.get('/admin', async (req, res) => {
    try {
        const newsData = await News.find().sort({ date: -1 });
        res.render('admin/news', { newsData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to fetch archived news articles
router.get('/archive', async (req, res) => {
    try {
        const newsData = await News.find().sort({ date: -1 });
        res.render('archive', { newsData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
// Like a comment
router.post('/:newsId/comments/:commentId/like', async (req, res) => {
    try {
      const news = await News.findById(req.params.newsId);
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
      const comment = news.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      comment.reactions.likes += 1;
      await news.save();
      res.status(200).json({ message: 'Comment liked successfully' });
    } catch (err) {
      console.error('Error liking comment:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Reply to a comment
  router.post('/:newsId/comments/:commentId/reply', async (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({ message: 'User and text are required' });
    }
    try {
      const news = await News.findById(req.params.newsId);
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
      const comment = news.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const newReply = { user, text };
      comment.replies.push(newReply);
      await news.save();
      res.status(200).json({ message: 'Reply added successfully' });
    } catch (err) {
      console.error('Error adding reply:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
module.exports = router;