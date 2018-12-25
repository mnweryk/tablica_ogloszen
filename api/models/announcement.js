const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId, //serial ID, string
    type: String,
    title: String,
    description: String,
    author: String,
    contact: String,
    city: String,
    price: String,
    date: String
    // type: String,
    // name: String,
    // price: String
});

module.exports = mongoose.model('Announcement', announcementSchema);