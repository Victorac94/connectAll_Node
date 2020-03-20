const getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM categories');
    } catch (err) {
        return err;
    }
}

const create = async ({ name }) => {
    try {
        return await executeQuery('INSERT INTO categories (name) values (?)', [name]);
    } catch (err) {
        return err;
    }
};

const deleteById = async (category) => {
    try {
        return await executeQuery('DELETE FROM categories WHERE id = ?', [category]);
    } catch (err) {
        return err;
    }
}

const getUserCategories = async userId => {
    try {
        return await executeQuery('SELECT fk_category FROM tbi_users_categories WHERE fk_user = ?', [userId]);
    } catch (err) {
        return err;
    }
}

executeQuery = (query, params = null) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

module.exports = {
    getAll: getAll,
    create: create,
    deleteById: deleteById,
    getUserCategories: getUserCategories
}