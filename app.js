
var mysql = require('mysql');

var steps;
var request = require('request')
  , url = "http://api.fitbit.com/1/user/-/activities/date/2013-10-06.json"
  , oauth = {
      consumer_key: "bf1c0d808bbc488eb4a354a28d4f4899",
      consumer_secret: "3d80026ed5784074836f606d812cf797",
      token: "cdf32ea39e2679a07051d608a1719d9d",
      token_secret: "d85481259501056b519307e9823effe4"
    };

function request_call() {
request.post({url:url, oauth:oauth}, function (e, r, body) {
  var json = JSON.parse(arguments[2]);
  steps = json.summary.steps;
  console.log(steps);
  var connection = mysql.createConnection({
 host: 'uroomswap.db.7681913.hostedresource.com',
 user: 'uroomswap',
 password: 'BUcompsci123',
 database: 'uroomswap',
});
connection.connect(function(err) {
  var q = "UPDATE `fitbit` SET `current` = '" + steps + "' WHERE `id` = 1";
  console.log(q);
  var query = connection.query(q, console.log);
  connection.end();
});
/*var connection = mysql.createConnection({
  host     : 'uroomswap.db.7681913.hostedresource.com',
  user     : 'uroomswap',
  password : 'BUcompsci123',
  database : 'uroomswap',
  port: 8081
});

connection.connect();
var query = "UPDATE `fitbit` SET `current` = " + steps + " WHERE `id` = 1";
connection.query(query, function(err, rows, fields) {
  if (err) throw err;

  console.log(query);
});*/
request.post({
        url: 'http://www.guyaridor.com/fitbit.php',
         headers: {'content-type' : 'application/x-www-form-urlencoded'},
         body: "step="+steps,
         }, function(error, response, body){
            console.log(body);
    });



});
}
request_call();
setInterval(request_call, 2000);




/*
var connection = mysql.createConnection({
  host     : 'uroomswap.db.7681913.hostedresource.com',
  user     : 'uroomswap',
  password : 'BUcompsci123',
  database : 'uroomswap',
});

connection.connect();
var query = "UPDATE `fitbit` SET `current` = " + steps + "";
connection.query(query, function(err, rows, fields) {
  if (err) throw err;

  console.log(query);
});

connection.end();
*/
