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


// Return cost per transaction
function getCostPerTransaction($){
  console.log(
    parseFloat(
      $('#cost-per-transaction').find('.stat .impact-number strong').first().text().trim().replace('£','')
      ).toFixed(2)
  );
  return parseFloat($('#cost-per-transaction').find('.stat .impact-number strong').first().text().trim().replace('£','')).toFixed(2);
}

function getTransactionsPerYear($) {
  console.log($('#transactions-per-year').find('.impact-number abbr').attr('title').replace(/,/gi, '')
  );
  return $('#transactions-per-year').find('.impact-number abbr').attr('title').replace(/,/gi, '');
}

module.exports.get_module_values = function (dashboard) {
  console.log('getting', 'https://www.gov.uk/performance/'+dashboard['slug']);
  request('https://www.gov.uk/performance/' + dashboard['slug'], function(err, response, html) {
    if (err) throw err;
    if (!err) {
      $ = cheerio.load(html);

      dashboard['modules'].forEach(function (module) {

        console.log('module', module['slug']);

        if(module['slug'] === 'cost-per-transaction'){
          module['cost-per-transaction'] = getCostPerTransaction($);
        }
        if(module['slug'] === 'transactions-per-year'){
          module['transactions-per-year'] = getTransactionsPerYear($);
        }
        // console.log(module[module['slug']]);
      });
    }
  });
};

module.exports.get_module = function (module, callback) {
  if(module['value-attribute'] == 'cost_per_transaction'){
    getCostPerTransaction()
  }
};

// get_dashboard_list('https://stagecraft.production.performance.service.gov.uk/public/dashboards');
