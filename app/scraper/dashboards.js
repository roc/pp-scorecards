var request = require('request');
var cheerio = require('cheerio');

module.exports.get_dashboard = function (url, callback) {

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

module.exports.get_module_values = function (dashboard) {
  console.log('getting', dashboard['slug']);
  request('https://www.gov.uk/performance/' + dashboard['slug'], function(err, response, html) {
    if (err) throw err;
    if (!err) {
      console.log(html);
      $ = cheerio.load(html);
      console.log($);
    }
  });
};

module.exports.get_module = function (module, callback) {
  if(module['value-attribute'] == 'cost_per_transaction'){
    getCostPerTransaction()
  }
};

// get_dashboard_list('https://stagecraft.production.performance.service.gov.uk/public/dashboards');
