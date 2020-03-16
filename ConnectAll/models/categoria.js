const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from categorias', (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

const create = ({ nombre }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into categorias (nombre) values (?)', [nombre], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const deleteById = (pCategoriaId) => {
    return new Promise((resolve, reject) => [
        db.query('delete from categorias where id = ?', [pCategoriaId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    ])
}

module.exports = {
    getAll: getAll,
    create: create,
    deleteById: deleteById
}