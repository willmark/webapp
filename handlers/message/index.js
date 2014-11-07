module.exports = {
    index: function(req, res) {

        function formatEmail(params) {
            var result = 'from: ' + params.name + '<' + params.email +'>' + '\nto: webmaster' + '\nsubject: ' + params.subject + '\n\n' + params.message
            return result;
        }

        try {
            req.on('data', function (dat) {
                var params = JSON.parse(dat.toString());
                var crypto = require('crypto');
                var fs = require('fs');
                var path = require('path');
                var md5sum = crypto.createHash('md5');
                md5sum.update(dat.toString());
                var fname = md5sum.digest('hex');
                fs.writeFile(path.join(require.main.config.maildir, fname), formatEmail(params), function (err) {
                    if (err) console.error(err);
                });
            });
            res.end('Message sent.  We will respond to you shortly.');
        } catch (err) {
            console.error(err);
            res.end('Error sending message');
        }
    }
};
