module.exports = function (app) {
    const {Category, Report} = app.models;

    Category.find()
        .then(results => console.log(results))
        .catch(err => console.log(err));

};
