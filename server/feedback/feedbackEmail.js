const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASSWORD_FROM,
    },
})

module.exports = async (text) => await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to:  process.env.EMAIL_TO,
    subject: 'Оповещение от Appro',
    text: text,
})