module.exports = ({ rp }) => [
  'post',
  [
    '/',
    async (req, res) => {
      const apiaiRequest = req.body;
      let aiRequest;
      let aiResponse;
      let apiaiResponse;
      try {
        aiRequest = require('./transformers/request')(apiaiRequest);
        aiResponse = await rp.post({ body: aiRequest });
        apiaiResponse = require('./transformers/response')(aiResponse);
        console.log(JSON.stringify({ apiaiRequest, aiRequest, aiResponse, apiaiResponse }));
      } catch (e) {
        const error = e.message;
        console.error(JSON.stringify({ error, apiaiRequest, aiRequest, aiResponse, apiaiResponse }));
      }
      res.send(apiaiResponse);
    },
  ],
];
