var colors = require('colors');

module.exports.log = function() {
  var colours = ['green', 'cyan', 'yellow'];
  var args = Array.prototype.slice.call(arguments).map(function (arg, i) {
      var color = colours[i % colours.length];
      return arg[color];
  }),
      message = args.join(': '.grey);
  return console.log('[Scraper]'.magenta, message);
};
