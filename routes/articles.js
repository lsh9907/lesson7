var express = require('express');
var router = express.Router();

// add mongoose
var mongoose = require('mongoose');

// make this page to refer to the database
var Article = require('../models/article');

// Set up the get handler for the main articles page
router.get('/', function(req, res, next) {
    // use the article model to query the articles collection in the db
    Article.find(function(err, articles) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('articles', {
                title: 'Articles',
                articles: articles
            });

        }
    })
});

// GET handler for add to display a blank form
router.get('/add', function(req, res, next) {
    res.render('articles/add', {
        title: 'Add a New Article'
    });
});
// POST handler for add to process the form
router.post('/add', function(req, res, next) {
    // save a new article using our Article model
    Article.create( {
        title: req.body.title,
        content: req.body.content
        }
    );
    // redirect to main articles page
    res.redirect('/articles');
});
// make public
module.exports = router;