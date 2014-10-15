var fs = require('fs');
var q = require('q');
var logger = require('./logger');

module.exports.save_to_disk = function(filePath, fileBody) {
    // var deferred = q.defer();
    logger.log('Writing ' + filePath + ' with ' + fileBody.length + ' items');
    fs.writeFile('/Users/ralphcowling/govuk/scorecards/' + filePath, fileBody, function(err) {
        if(err) {
            console.log(err);
            logger.log(err);
            throw err;
        } else {
            logger.log('File saved to', filePath);
            // deferred.resolve();
        }
    });
    // return deferred.promise;
};
