const multiparty = require('multiparty');
const _ = require('lodash');
const os = require('os');

module.exports = function getFormData(req, cb) {
    const form = new multiparty.Form({
        autoFields: true,
        autoFiles: true,
        uploadDir: os.tmpdir()
    });
    return new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (cb) cb(err, fields, files);
            if (err) {
                reject(err);
                return;
            }
            resolve({fields, files});
            _.keys(fields).forEach(function (name) {
                console.log('got field named ' + name);
            });

            _.keys(files).forEach(function (name) {
                console.log('got file named ' + name);
            });
            console.log('Form scan completed.');
        });
    });
};