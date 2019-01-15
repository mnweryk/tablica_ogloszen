const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')
const User = require('../models/user')

const Announcement = require('../models/announcement');

router.get('/kupie', (req, res, next) => {
    Announcement.find({type: ["KUPIE", "Kupie", "kupie"]})
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

router.get('/sprzedam', (req, res, next) => {
    Announcement.find({type: ["SPRZEDAM", "Sprzedam", "sprzedam"]})
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

router.get('/zamienie', (req, res, next) => {
    Announcement.find({type: ["ZAMIENIE", "Zamienie", "zamienie"]})
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

router.get('/:announcementId', (req, res, next) => {
    const id = req.params.announcementId;
    Announcement.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });

});

router.patch('/:announcementId', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'Updated announcement!'
    });
});

router.delete('/:announcementId', (req, res, next) => {
    res.status(200).json({
        message: 'announcement deleted!'
    });
});

var datetime = new Date();

router.post('/', checkAuth, (req, res, next) => {
    const announcement = new Announcement({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        contact: req.body.contact,
        city: req.body.city,
        price: req.body.price,
        date: datetime.toISOString().slice(0,10)
    });
    announcement.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: announcement
    });
});

module.exports = router;