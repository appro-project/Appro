const { ViberClient } = require('messaging-api-viber');

const client = new ViberClient({
    accessToken: process.env.ACCESS_TOKEN,
    sender: {
        name: 'Sender',
    },
});

module.exports.sendMessageViber = (text) => client.sendText(process.env.USER_ID, text).then(() => {
    console.log('sent');
}).catch(err => {
    console.error('err', err);
});
