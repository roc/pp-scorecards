var save = require('./save');
var dashboardScraper = require('./dashboards');
var logger = require('./logger');
var dashboardsList = require('../../data/dashboards.json');
var kpiScraper = require('./kpis');
var fs = require('fs');
// var redis = require("redis"),
//     client = redis.createClient();

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

acceptedModuleList = ['kpi'];

function getDashboardWithModules (json) {
  var modules = json['modules'];
  logger.log('listing modules for', json['title'], '(' + json['slug'] + ')');

  var dashboardWithModules = {
    'slug': json['slug'],
    'modules': []
  };

  modules.map( function (module) {
    logger.log('module', module['title'], 'of type', module['module-type']);

    if(acceptedModuleList.indexOf(module['module-type']) > -1) {
      dashboardWithModules['modules'].push(module);
      console.log('MATCH',dashboardWithModules);
    }

  });

  return dashboardWithModules;
}


var dashboardDir = '/Users/ralphcowling/govuk/scorecards/data/dashboards/';

// fs.readdir(dashboardDir, function (err, files) {
//     if(err) throw err;

//     files.forEach( function (file, i) {
//         if(i<1){
//           logger.log('Reading ' + file);
//           fs.readFile(dashboardDir+file, 'utf-8', function (err, data) {
//             if (err) throw err;
//             var json = JSON.parse(data);
//             var dashboardWithModules = getDashboardWithModules(json);
//             dashboardScraper.get_module_values(dashboardWithModules);
//           });
//           i++;
//         }
//     });

//  });

fs.readFile(dashboardDir+'tax-disc.json', 'utf-8', function (err, data) {
  if (err) throw err;
  var json = JSON.parse(data);
  var dashboardWithModules = getDashboardWithModules(json);
  dashboardScraper.get_module_values(dashboardWithModules);
});
