var express = require('express')
var app = express();
var routes = require('./routes/index');

app.use('/', routes);

app.set('views', path.join(__dirname, 'views'));


app.get('/', function (req, res) {
  res.send('Hello World!')
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

module.exports = app;
