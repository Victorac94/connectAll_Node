getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM posts', null);
    } catch (err) {
        return err;
    }
};

add = async ({ titulo, cuerpo, imagen, fk_usuario, fk_categoria }) => {
    try {
        return await executeQuery('INSERT INTO posts (titulo, cuerpo, imagen, fk_usuario, fk_categoria) VALUES (?,?,?,?,?)', [titulo, cuerpo, imagen, fk_usuario, fk_categoria]);
    } catch (err) {
        return err;
    }
}

edit = async ({ titulo, cuerpo, imagen, fk_usuario, fk_categoria, postID }) => {
    try {
        return await executeQuery(`UPDATE posts SET titulo = ?, cuerpo = ?, imagen = ?, fk_usuario = ?, fk_categoria = ? WHERE Id = ?`, [titulo, cuerpo, imagen, fk_usuario, fk_categoria, postID]);
    } catch (err) {
        return err;
    }
}

deletePost = async (data) => {
    try {
        return await executeQuery(`DELETE FROM posts WHERE id = ?`, [data.id]);
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
    deletePost: deletePost
};