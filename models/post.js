getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM posts', null);
    } catch (err) {
        return err;
    }
};

add = async ({ title, body, picture, fk_user, fk_category }) => {
    try {
        return await executeQuery('INSERT INTO posts (title, body, picture, fk_user, fk_category) VALUES (?,?,?,?,?)', [title, body, picture, fk_user, fk_category]);
    } catch (err) {
        return err;
    }
};

edit = async ({ title, body, picture, fk_user, fk_category, postID }) => {
    try {
        return await executeQuery(`UPDATE posts SET title = ?, body = ?, picture = ?, fk_user = ?, fk_category = ? WHERE Id = ?`, [title, body, picture, fk_user, fk_category, postID]);
    } catch (err) {
        return err;
    }
};

deletePost = async (data) => {
    try {
        return await executeQuery(`DELETE FROM posts WHERE id = ?`, data.id);
    } catch (err) {
        return err;
    }
};

getPostsByCategory = async categoryId => {
    try {
        return await executeQuery('SELECT * FROM posts WHERE fk_category = ? ORDER BY creation_date DESC', categoryId);
    } catch (err) {
        return err;
    };
};

getPostsByUserId = async userId => {
    try {
        return await executeQuery('SELECT * FROM posts WHERE fk_user = ? ORDER BY creation_date DESC', userId)
    } catch (err) {
        return err;
    }
}

executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAll: getAll,
    add: add,
    edit: edit,
    deletePost: deletePost,
    getPostsByCategory: getPostsByCategory,
    getPostsByUserId: getPostsByUserId
};