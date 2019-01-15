const express = require("express");
const router = express.Router();

const Message = require('../models/contact');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

//const appMailer = require(('../../appmailer'));

router.get('/', (req, res, next) => {
    const authors = ["pikachuu", "szpadelka"];
    res.status(200).json({
        message: "dziekujemy za odwiedzenie naszej strony, zapraszamy do wyslania nam wiadomosci",
        autorzy: authors,
        mail: "gosiaandmati@superprojekt.com"
    })

});

router.post('/', (req, res, next) => {
    const message = {
        to: req.body.mail,
        from: 'gosiaandmati@superprojekt.com',
        subject: 'Your message has been received',
        text: 'thank you for your message, we will response as fast as possible'
    };

    const receivedMessage = new Message({
        autor: req.body.mail,
        message: req.body.message
    });

    receivedMessage.save().then(result => {
        console.log(result);
    })
        .catch(err => console.log(err));

    sgMail.send(message);

    res.status(200).json({
        message: "message sent"
    })
});

// router.post('/', (req, res, next) => {
//     const application = {
//         name: req.body.name,
//         email: req.body.email,
//         message: req.body.message
//     };
//
//     await Application.create(application)
//
//     appMailer.applicationNotify({
//         email: req.body.email,
//         data: {
//             name: req.body.name
//         }
//     })
// });

module.exports = router;