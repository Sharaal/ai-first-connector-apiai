const _ = require('lodash');

module.exports = ({ rp }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const apiaiRequest = req.body;
    const id = _.get(apiaiRequest, 'id');
    console.log(`id: ${id}`);
    console.log(`(${id}) apiaiRequest: ${JSON.stringify(apiaiRequest)}`);
    const aiRequest = {
      id,
      locale: _.get(apiaiRequest, 'lang'),
      name: _.get(apiaiRequest, 'result.metadata.intentName'),
      params: _.get(apiaiRequest, 'result.parameters'),
      session: (() => {
        const context = _.get(apiaiRequest, 'result.contexts', [])
          .filter(context => context.name === 'session')[0];
        if (!context) {
          return {};
        }
        return context.parameters;
      })(),
      user: {
        id: _.get(apiaiRequest, 'originalRequest.data.user.user_id'),
        accessToken: _.get(apiaiRequest, 'originalRequest.data.user.access_token')
      },
    };
    console.log(`(${id}) aiRequest: ${JSON.stringify(aiRequest)}`);
    const aiResponse = await rp.post({ body: aiRequest });
    console.log(`(${id}) aiResponse: ${JSON.stringify(aiResponse)}`);
    const apiaiResponse = {};
    if (aiResponse.say) {
      apiaiResponse.speech = aiResponse.say;
    }
    if (aiResponse.display) {
      apiaiResponse.displayText = `${aiResponse.display.title}: ${aiResponse.display.text}`;
    }
    if (aiResponse.session) {
      apiaiResponse.contextOut = [{ name: 'session', lifespan: 1, parameters: aiResponse.session }];
    }
    console.log(`(${id}) apiaiResponse: ${JSON.stringify(apiaiResponse)}`);
    res.send(apiaiResponse);
  }]];
