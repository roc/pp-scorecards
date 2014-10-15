var save = require('./save');
var dashboardScraper = require('./dashboards');
var logger = require('./logger');
var dashboardsList = require('../../data/dashboards.json');
var kpiScraper = require('./kpis');
var fs = require('fs');


function generateDashboardList () {
    dashboardScraper.get_dashboard('https://stagecraft.production.performance.service.gov.uk/public/dashboards', function(data){
      logger.log('Got data with', '('+data.length+') items');
      save.save_to_disk('data/dashboards.json', data);
  });
}

function getIndividualDashboards () {
  dashboardsList.items.map( function (dashboard) {

    logger.log('Getting dashboard json for ' + dashboard.slug);

    dashboardScraper.get_dashboard('https://stagecraft.production.performance.service.gov.uk/public/dashboards?slug='+dashboard.slug, function (data) {
        logger.log('Got data with', '('+data.length+') items');
        save.save_to_disk('data/dashboards/'+dashboard.slug+'.json', data);
    });

  });
}

// getIndividualDashboards();

var dashboardDir = '/Users/ralphcowling/govuk/scorecards/data/dashboards/';
fs.readdir(dashboardDir, function (err, files) {
    if(err) throw err;
    files.forEach( function (file) {
        logger.log('Reading ' + file);
        fs.readFile(dashboardDir+file, 'utf-8', function (err, data) {
          if (err) throw err;
          var json = JSON.parse(data);
          console.log(json['modules']);
        });
    });
 });


