require('dotenv-safe').config();

require('dcontrollers')(
  require('dexpress')(),
  [
    require('./controller')({
      rp: require('request-promise').defaults({ json: true, url: process.env.AI_WEBHOOK_URL }),
      secret: process.env.AI_WEBHOOK_SECRET,
    }),
  ]
);
