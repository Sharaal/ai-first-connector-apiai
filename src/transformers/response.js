const _ = require('lodash');

module.exports = aiResponse => ({
  speech: _.get(aiResponse, 'say', ''),
  displayText: (() => {
    if (_.has(aiResponse, 'display')) {
      return `${_.get(aiResponse, 'display.title', '')}: ${_.get(aiResponse, 'display.text', '')}`;
    }
  })(),
  contextOut: [
    {
      name: 'session',
      lifespan: 1,
      parameters: _.get(aiResponse, 'session', {}),
    },
  ],
});
