var cheerio = require('cheerio');

module.exports.kpi = function (url, callback) {
  var json = {};

  request(url, function(error, response, html) {
    if (!error) {
      var title, release, rating,
        $ = cheerio.load(html);

      json.value = $('.stat .impact-number strong').text().trim();
      json.period = $('.stat .period').text().trim();
      json.prettyName = $('h1').last().text().trim();
      json.url = url;

      callback(null, json);
    }
  });
};

module.exports.realtime = function (url, callback) {
  var json = {};

  request(url, function(error, response, html) {
    if (!error) {
      var title, release, rating,
        $ = cheerio.load(html);

      json.value = $('.stat .impact-number strong').text().trim();
      json.period = $('.stat .stat-description').text().trim();
      json.prettyName = $('h1').last().text().trim();
      json.url = url;

      callback(null, json);
    }
  });
};

module.exports.user_satisfaction = function (url, callback) {
  var json = {};

  request(url, function(error, response, html) {
    if (!error) {
      var title, release, rating,
        $ = cheerio.load(html);

      json.value = $('.single-stat-headline.impact-number strong').text().trim();
      json.period = $('.single-stat-headline.impact-number').clone().children().remove().end().text().trim();
      json.prettyName = $('h1').last().text().trim();
      json.url = url;

      callback(null, json);
    }
  });
};

module.exports.user_satisfaction_graph = module.exports.completion_rate = function (url, callback) {
  var json = {};

  request(url, function(error, response, html) {
    if (!error) {
      var title, release, rating,
        $ = cheerio.load(html);

      json.value = $('.volumetrics-completion-selected strong').text().trim();
      json.period = $('.volumetrics-completion-selected').clone().children().remove().end().text().trim();
      json.prettyName = $('h1').last().text().trim();
      json.url = url;

      callback(null, json);
    }
  });
};
