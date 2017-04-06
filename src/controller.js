const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = ({ rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const apiaiRequest = req.body;
    let aiRequest, aiResponse, apiaiResponse, error;
    const headers = {};
    if (secret) {
      const intent = _.get(apiaiRequest, 'result.metadata.intentId', '');
      headers['jwt-token'] = jwt.sign({ connector: 'apiai', intent }, secret);
    }
    try {
      aiRequest = require('./transformers/request')(apiaiRequest);
      aiResponse = await rp.post({ body: aiRequest, headers });
      apiaiResponse = require('./transformers/response')(aiResponse);
    } catch (e) {
      error = e.message;
    }
    console.log(`(${aiRequest.id}): ${JSON.stringify({ apiaiRequest, aiRequest, aiResponse, apiaiResponse, error, headers })}`);
    res.send(apiaiResponse);
  }]];
