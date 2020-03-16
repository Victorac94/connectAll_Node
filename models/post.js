getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM posts', null);
    } catch (err) {
        return err;
    }
};

executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAll: getAll
};