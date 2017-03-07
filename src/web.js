require('dotenv').config({ silent: true });
const _ = require('lodash');

const app = require('express')();
app.listen(process.env.PORT);

const rp = require('request-promise').defaults({
  json: true,
  url: process.env.AI_WEBHOOK_URL,
});

app.post('/', require('body-parser').json(), async (req, res) => {
  const apiaiRequest = req.body;
  const id = _.get(apiaiRequest, 'id');
  console.log(`id: ${id}`);
  console.log(`(${id}) apiaiRequest: ${JSON.stringify(apiaiRequest)}`);
  const aiRequest = {
    id,
    name: _.get(apiaiRequest, 'result.metadata.intentName'),
    params: _.get(apiaiRequest, 'result.parameters'),
    session: {},
  };
  console.log(`(${id}) aiRequest: ${JSON.stringify(aiRequest)}`);
  const aiResponse = await rp.post({ body: aiRequest });
  console.log(`(${id}) aiResponse: ${JSON.stringify(aiResponse)}`);
  const apiaiResponse = {};
  if (aiResponse.say) {
    apiaiResponse.speech = aiResponse.say;
  }
  console.log(`(${id}) apiaiResponse: ${JSON.stringify(apiaiResponse)}`);
  res.send(apiaiResponse);
});
