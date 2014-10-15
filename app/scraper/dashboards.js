var request = require('request');

module.exports.get_dashboard = function(url, callback) {

  request(url, function(
    error,
    response,
  json) {
    if (!error) {

      if (callback) {
        callback(json);
      }
    }
  });
};

// get_dashboard_list('https://stagecraft.production.performance.service.gov.uk/public/dashboards');
