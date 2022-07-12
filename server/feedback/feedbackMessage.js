const wbm = require('wbm');

module.exports = (message) => wbm.start().then(async () => {
    await wbm.sendTo(process.env.PHONE_NUMBER, message);
    await wbm.end();
}).catch(err => console.log(err));