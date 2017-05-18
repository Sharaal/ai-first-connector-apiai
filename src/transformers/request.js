const _ = require('lodash');

module.exports = apiaiRequest => ({
  id: _.get(apiaiRequest, 'id', ''),
  locale: _.get(apiaiRequest, 'lang', ''),
  name: _.get(apiaiRequest, 'result.metadata.intentName', ''),
  params: _.get(apiaiRequest, 'result.parameters', {}),
  session: (() => {
    const context = _.get(apiaiRequest, 'result.contexts', []).filter(
      context => context.name === 'session'
    )[0];
    if (!context) {
      return {};
    }
    return context.parameters;
  })(),
  user: {
    id: _.get(apiaiRequest, 'originalRequest.data.user.user_id', ''),
    accessToken: _.get(
      apiaiRequest,
      'originalRequest.data.user.access_token',
      ''
    ),
  },
});
