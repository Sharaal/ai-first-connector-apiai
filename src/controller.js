module.exports = ({ rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const apiaiRequest = req.body;
    let aiRequest, aiResponse, apiaiResponse, error;
    const headers = { secret };
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
