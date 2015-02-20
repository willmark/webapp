/**
 * A simple Readable implementation for identifing a resources content-type
 * And streaming the resource if available
 */
var Readable = require("stream").Readable;

function ResourceReader(resources, file, readerOpts) {
    if (!(this instanceof ResourceReader)) return new ResourceReader(resources, readerOpts);
    Readable.call(this, readerOpts);
    this._resources = resources;
    this._file = file;
    this._pushed = false;
}

var util = require("util");

util.inherits(ResourceReader, Readable);

/**
 * Handles reading a resource file
 * filepath - path to the resources
 */
ResourceReader.prototype.checkResource = function(filepath) {
    var fs = require("fs"), path = require("path"), file = path.join(this._resources, filepath);
    try {
        if (!fs.statSync(file).isFile()) {
            throw new Error('Not a file resource:',file); 
        }
        var src = require("fs").createReadStream(file);
        var self = this;
        src.on('data', function(chunk) {
            self.push(chunk);
        });
        src.on('error', function(err) {
            console.error('file error ',err);
        });
        src.on('end', function() {
            self.push(null);
        });
        var ctype;
        switch (path.extname(file)) {
          case ".html":
            ctype = "text/html";
            break;

          case ".css":
            ctype = "text/css";
            break;

          case ".png":
            ctype = "image/png";
            break;

          case ".gif":
            ctype = "image/gif";
            break;

          case ".jpg":
            ctype = "image/jpeg";
            break;

          case ".svg":
            ctype = "image/svg+xml";
            break;

          case ".js":
            ctype = "application/x-javascript";
            break;

          default:
            ctype = "text/plain";
        }
        this.emit("ctype", ctype);
    } catch (err) {
        //not a valid resource, no readstream will be created
        this.emit("noresource", err);
    }
};

ResourceReader.prototype._read = function(size) {
    //if (this._file !== undefined) {
    if (!this._pushed) {
        this._pushed = true;
        this.checkResource(this._file);
    }
};

module.exports = {
    ResourceReader: ResourceReader
};
