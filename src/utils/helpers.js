export const iterateObject = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(obj[key], key);
    });
};

export const mapObject = (obj, callback) => {
    return Object.keys(obj).map((key) => {
        return callback(obj[key], key);
    });
};

export const mapKeys = (arr, prop = "id") => {
    return arr.reduce((obj, value) => {
        obj[value[prop]] = value;
        return obj;
    }, {});
};

export const reduceObject = (obj, callback, initialObj) => {
    return Object.keys(obj).reduce((nextObj, key) => {
        return callback(nextObj, obj[key], key);
    }, initialObj);
};