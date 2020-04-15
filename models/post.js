getAll = async () => {
    try {
        return await executeQuery(`
        SELECT posts.*, users.user_name, users.user_last_name, users.user_picture, users.id as user_id, categories.category_name, categories.id as category_id 
        FROM posts 
        INNER JOIN users ON posts.fk_user = users.id 
        INNER JOIN categories ON fk_category = categories.id 
        ORDER BY post_creation_date DESC`, null);
    } catch (err) {
        return err;
    }
};

add = async ({ body, picture, fk_user, fk_category }) => {
    try {
        return await executeQuery('INSERT INTO posts (post_body, post_picture, fk_user, fk_category) VALUES (?,?,?,?)', [body, picture, fk_user, fk_category]);
    } catch (err) {
        return err;
    }
};

edit = async ({ body, picture, fk_user, fk_category, postID }) => {
    try {
        return await executeQuery(`UPDATE posts SET post_body = ?, post_picture = ?, fk_user = ?, fk_category = ? WHERE Id = ?`, [body, picture, fk_user, fk_category, postID]);
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
        // return await executeQuery('SELECT * FROM posts WHERE fk_category = ? ORDER BY creation_date DESC', categoryId);
        // return await executeQuery('SELECT posts.*, user_name, user_last_name, user_picture, users.id FROM posts INNER JOIN users WHERE posts.fk_category = ? AND posts.fk_user = users.id ORDER BY post_creation_date DESC', [categoryId]);
        return await executeQuery(`
        SELECT posts.*, users.user_name, users.user_last_name, users.user_picture, users.id as user_id, categories.category_name, categories.id as category_id 
        FROM posts 
        JOIN categories ON posts.fk_category = categories.id 
        JOIN users ON posts.fk_user = users.id 
        WHERE categories.id = ?
        ORDER BY posts.post_creation_date DESC`, categoryId);
    } catch (err) {
        return err;
    };
};

getPostsByUserId = async userId => {
    try {
        return await executeQuery(`
        SELECT posts.*, users.user_name, users.user_last_name, users.user_picture, users.id as user_id, categories.category_name, categories.category_icon, categories.id as category_id 
        FROM posts 
        JOIN users ON posts.fk_user = users.id
        JOIN categories ON posts.fk_category = categories.id
        WHERE posts.fk_user = ? 
        ORDER BY post_creation_date DESC`, userId)
    } catch (err) {
        return err;
    }
}

getPostsBySearch = async search => {
    try {
        return await executeQuery(`
        SELECT posts.*, users.user_name, users.user_last_name, users.user_picture, users.id as user_id, categories.category_name, categories.category_icon, categories.id as category_id 
        FROM posts
        JOIN users ON posts.fk_user = users.id
        JOIN categories ON posts.fk_category = categories.id
        WHERE posts.post_body LIKE ?
        GROUP BY posts.post_creation_date`, '%' + search + '%')
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
    getPostsByUserId: getPostsByUserId,
    getPostsBySearch: getPostsBySearch
};