const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ name, lastName, password, email }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (name, lastName, , password, email ) values (?,?,?,?)', [name, lastName, , password, email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getAll: getAll,
    create: create
}