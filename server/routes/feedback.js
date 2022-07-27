const express = require('express');
const feedbackEmail = require('../feedback/feedbackEmail');
const feedbackMessage = require('../feedback/feedbackMessage');
const router = express.Router();

router.post('/',  async (req, resp, next) => {
    const body = req.body;

    try {
        const text = `
            Имя: ${body.name ? body.name : '-'}; \n
            Телефон:  ${body.phone ? body.phone : '-'};  \n
            Email:  ${body.email ? body.email : '-'};\n
            Сообщение: ${body.feedback ? body.feedback : '-'};  \n
            Проект: ${body.project ? body.project : '-'}; \n
            Время звонка: ${body.anytime ? 'в любое время' : `${body.date} ${body.time}`}; \n
        `;

            await feedbackEmail(text);
            await feedbackMessage.sendMessageViber(text);

        resp.status(200) .json({
                success: true,
                massage: 'Message sent',
            }
        )
    } catch (e){
        resp.status(401) .json({
                success: false,
                massage: `Error` + e.message,
            }
        )
    }
});

module.exports = router;