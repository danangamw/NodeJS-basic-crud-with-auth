const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamps) => {
  return format(timestamps);
};

module.exports = helpers;
