const express = require('express');
const feedbackEmail = require('../feedback/feedbackEmail');
const feedbackMessage = require('../feedback/feedbackMessage');
const router = express.Router();

router.patch('/',  (req, resp, next) => {
    const body = req.body;

    try {
        const text = `
            Имя: ${body.name}; \n
            Телефон:  ${body.phone};  \n
            Email:  ${body.email};\n
            Сообщение: ${body.feedback};  \n
            Проект: ${body.project}; \n
        `;

            feedbackEmail(text);
            feedbackMessage(text);

        resp.status(200) .json({
                success: true,
                massage: 'Message sent',
            }
        )
    } catch (e){
        resp.status(404) .json({
                success: false,
                massage: `Error` + e.message,
            }
        )
    }
});

module.exports = router;