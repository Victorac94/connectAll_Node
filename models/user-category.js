add = async (userId, categories) => {
    try {
        const params = categories.map(cat => `(${userId}, ${cat})`);

        return await executeQuery(`INSERT INTO tbi_users_categories (fk_user, fk_category) VALUES ${params.join(', ')}`)
    } catch (err) {
        return err;
    }
};

executeQuery = (query, params = null) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    add: add
};