const { ViberClient } = require('messaging-api-viber');
const request = require('request');

const client = new ViberClient({
    accessToken: process.env.ACCESS_TOKEN,
    sender: {
        name: 'Sender',
    },
});

module.exports.sendMessageViber = async (text) => {
    await request.post(
        'https://chatapi.viber.com/pa/get_account_info',
        { json: {
                "auth_token": "4f86ca9a0fa7e0ec-1803590f44df6e54-907ccee6220c0704"
            }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body.members.map(x => x.id).forEach(async (x) => {
                    await client.sendText(process.env.USER_ID, text).then(() => {
                        console.log('sent');
                    }).catch(err => {
                        console.error('err', err);
                    });
                })
            }
        }
    );

}
