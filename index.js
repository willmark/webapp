var http = require('http');
var net = require('net');
var url = require('url');
var fs = require("fs");
var path = require("path");

var port = process.argv[2] || 0;
var rootdir = path.dirname(process.argv[1]);
var wwwdir = path.join(rootdir, 'www');
var config = JSON.parse(fs.readFileSync(path.join(rootdir, 'config.json')));
require.main.config = config;

// Create an HTTP tunneling proxy
var proxy = http.createServer(function (req, res) {
  var ResourceReader = require(path.join(rootdir, "reader")).ResourceReader;

  var parsedURL = url.parse(req.url, true);
  if (parsedURL.pathname === '/') parsedURL.pathname = config.defaultpage;
  var rr = new ResourceReader(wwwdir /* root dir of resources */, decodeURIComponent(parsedURL.pathname) /* file location relative to root */);
  rr.on("noresource", function(err) {
     /* handle file not exist information */
     var file = 'handlers' + parsedURL.pathname;
     try {
         handler = require(path.join(rootdir, file));
         handler.index(req, res);
     } catch (err) {
         console.error(err);
         res.end('Error');
     }
  });
  rr.on("ctype", function(ctype) {
     /* content-type identifier information suitable for piping to response header */
     res.writeHead(200, {'Content-Type': ctype});
  });
  rr.on("error", function(err) {
     /* handle stream error information */
     console.error(err);
     res.end('Error');
  });
  rr.on("data", function(chunk) {
     /* handle writing Buffer chunk data */
     res.write(chunk);
  });
  rr.on("end", function() {
     /* handle end of data stream */
     res.end();
  });

}).listen(port, function () {console.log('listening on port ' + port)});
