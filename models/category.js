const getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM categories ORDER BY categories.category_name');
    } catch (err) {
        return err;
    }
}

const create = async ({ name }) => {
    try {
        return await executeQuery('INSERT INTO categories (category_name) values (?)', [name]);
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
        // return await executeQuery('SELECT fk_category FROM tbi_users_categories WHERE fk_user = ?', [userId]);
        return await executeQuery('SELECT c.category_name, c.category_icon, c.id FROM categories as c JOIN tbi_users_categories as tbi WHERE tbi.fk_user = ? AND tbi.fk_category = c.id ORDER BY c.category_name', [userId]);
    } catch (err) {
        return err;
    }
}

const getCategoriesBySearch = async search => {
    try {
        return await executeQuery('SELECT c.id, c.category_name, c.category_icon FROM categories as c WHERE c.category_name LIKE ? ORDER BY c.category_name', '%' + search + '%');
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
    getUserCategories: getUserCategories,
    getCategoriesBySearch: getCategoriesBySearch
}