'use strict';
const getFormData = require('../../server/lib/formsHandler');

module.exports = function (Report) {

    Report.on('attached', function () {
        let uploadable = require('../../server/lib/uploadable')();
        uploadable(Report, 'Report', 'image', 'imageUpload');
    });

    /**
     * Creates a new report using form data.
     * @param {object} ctx The context of the request
     * @param {function(Error, object?)} callback
     */
    Report.createReport = function (ctx, callback) {
        getFormData(ctx.req, (err, fields, files) => {
            if (err) return callback(err);
            let newReport = JSON.parse(fields['values'][0]);
            newReport.categoryId = newReport.category + 1;

            Report.create(newReport, (err, report) => {
                if (err) return callback(err);
                Report.saveImage(event, files['image'][0], (err, res) => {
                    if (err) callback(err);
                    else callback(null, report);
                });
            });
        });
    };

    Report.disableRemoteMethodByName('create');
};
