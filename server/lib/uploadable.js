const fs = require('fs');
const uuid = require('uuid');
const async = require('async');
const mime = require('mime-types');
const VError = require('verror').VError;
const WError = require('verror').WError;

module.exports = function () {

    return function uploadableFactory(MyModel, myModelName, property, relationName) {

        // cleanup the uploads before destroying a model instance
        MyModel.observe('before delete', async (ctx, next) => {
            const results = await MyModel.find({where: ctx.where, include: [property]});

            next();
        });

        // upload a file and store metadata in an Upload instance for MyModel
        MyModel.saveImage = function (instance, file, cb) {
            return new Promise((resolve, reject) => {
                uploadable(instance, property, file, relationName, function (err, upload) {
                    if (cb) cb(err, upload);
                    if (!err) resolve(upload);
                    else reject(err);
                });
            });
        };

        MyModel.prototype.upload = function (property, ctx, cb) {
            MyModel.findById(ctx.instance.id, function (err, instance) {
                if (err) {
                    return cb(new VError(err, 'error reading %s.%s', myModelName, ctx.instance.id));
                }
                if (!instance) {
                    return cb(new VError(err, 'instance not found %s.%s', myModelName, ctx.instance.id));
                }

                let getFormData = require('./formsHandler');
                getFormData(ctx.req, (err, fields, files) => {
                    if (err) return cb(err);
                    uploadable(instance, property, files['image'][0], relationName, function (err, upload) {
                        return cb(err, upload);
                    });
                });
            });
        };

        MyModel.remoteMethod('prototype.upload', {
            accepts: [{
                arg: 'property',
                type: 'string',
                required: true
            }, {
                arg: 'ctx',
                type: 'object',
                http: {
                    source: 'context'
                }
            }],
            http: {
                path: '/upload/:property',
                verb: 'post'
            },
            returns: {
                arg: 'response',
                type: 'object'
            }
        });

    };
};

function uploadable(instance, property, file, relationName, next) {
    // steps for processing the request
    async.waterfall([
        checkLocalCopy,
        uploadFile,
        saveNewUploadInstance
    ], function (err, results) {
        if (err) {
            let e;
            if (typeof (err) === 'string') {
                e = new WError('upload failed ', err);
            }
            else {
                e = new WError(err, 'upload failed', err);
            }
            console.log(e.toString());
            return next(e);
        }
        // success - back to caller
        next(null, results);
    });

    function checkLocalCopy(cb) {
        const extension = mime.extension(file.headers['content-type']);
        if (!['jpg', 'jpeg', 'png'].includes(extension)) {
            cb(new VError('No se admite este formato.'));
        } else {
            cb(null, file, extension);
        }
    }

    function uploadFile(file, extension, cb) {
        // The code for uploading the image to a service should go here.
        cb(null, file);
    }

    // create new Upload instance
    function saveNewUploadInstance(file, cb) {
        console.log(file);
        let fileInstance = instance[relationName].build({
            'property': 'image',
            'filename': file.name,
            'type': 'image',
            'url': file.path
        });
        fileInstance.save(cb);
    }

}
