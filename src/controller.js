module.exports = ({ rp }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const apiaiRequest = req.body;
    let aiRequest, aiResponse, apiaiResponse, error;
    try {
      aiRequest = require('./transformers/request')(apiaiRequest);
      aiResponse = await rp.post({ body: aiRequest });
      apiaiResponse = require('./transformers/response')(aiResponse);
    } catch (e) {
      error = e.message;
    }
    console.log(`(${aiRequest.id}): ${JSON.stringify({ apiaiRequest, aiRequest, aiResponse, apiaiResponse, error })}`);
    res.send(apiaiResponse);
  }]];
