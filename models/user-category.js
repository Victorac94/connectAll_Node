add = async (userId, categories) => {
    const params = categories.map(cat => `(${userId}, ${cat})`);

    return await executeQuery(`INSERT INTO tbi_usuarios_categorias (fk_usuario, fk_categoria) VALUES ${params.join(', ')}`)
}

executeQuery = (query, params = null) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    add: add
};