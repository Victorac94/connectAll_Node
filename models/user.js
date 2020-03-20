const getAll = async () => {
    return await executeQuery('SELECT * FROM usuarios')
}

const getUser = async email => {
    const row = await executeQuery('SELECT * FROM usuarios WHERE email = ?', [email]);
    return row[0];
}

const create = async ({ name, lastName, email, password }) => {
    return await executeQuery('INSERT INTO usuarios (nombre, apellidos, contraseña, email ) values (?,?,?,?)', [name, lastName, password, email]);
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
    getUser: getUser,
    create: create
}