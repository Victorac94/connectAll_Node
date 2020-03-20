const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ name, lastName, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, apellidos, contraseña, email ) values (?,?,?,?)', [name, lastName, password, email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getAll: getAll,
    create: create
}