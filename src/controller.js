module.exports = ({ rp, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const apiaiRequest = req.body;
    let aiRequest, aiResponse, apiaiResponse, error;
    try {
      aiRequest = require('./transformers/request')(apiaiRequest);
      aiResponse = await rp.post({ body: aiRequest, headers: { secret } });
      apiaiResponse = require('./transformers/response')(aiResponse);
    } catch (e) {
      error = e.message;
    }
    if (error) {
      console.error(JSON.stringify({ error, apiaiRequest, aiRequest, aiResponse, apiaiResponse }));
    } else {
      console.log(JSON.stringify({ apiaiRequest, aiRequest, aiResponse, apiaiResponse }));
    }
    res.send(apiaiResponse);
  }]];
