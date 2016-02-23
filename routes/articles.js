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
    res.render('articles', {
        title: 'Articles'
    });
});

// make public
module.exports = router;