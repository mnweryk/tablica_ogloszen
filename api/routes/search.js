const express = require("express");
const router = express.Router();
const Announcement = require('../models/announcement');

router.get('/:type&:title&:city&:price', (req, res, next) => {
    const type = req.params.type;
    const title = req.params.title;
    const city = req.params.city;
    const price = req.params.price;
    if(city==="none" || price === "none") {
        Announcement.find({
            type:  type ,
            title: title,

        })
            .exec()
            .then(announcement => {
                console.log(announcement);
                res.status(200).json(announcement);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }else{ Announcement.find({
        type: type,
        title: title,
        city: city,
        price: price

    })
        .exec()
        .then(announcement => {
            console.log(announcement);
            res.status(200).json(announcement);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });}

});

router.get('/author/:author', (req, res, next)=> {
    const author = req.params.author;
    Announcement.find({
        author: author

    })
        .exec()
        .then(announcement => {
            console.log(announcement);
            res.status(200).json(announcement);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get('/city/:city', (req, res, next)=> {
    const city = req.params.author;
    Announcement.find({
        author: city

    })
        .exec()
        .then(announcement => {
            console.log(announcement);
            res.status(200).json(announcement);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});




module.exports = router;