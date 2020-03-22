const getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM users')
    } catch (err) {
        return err;
    }
}

const getUser = async email => {
    try {
        const row = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);
        return row[0];
    } catch (err) {
        return err;
    }
}

const getUserById = async userId => {
    try {
        const row = await executeQuery('SELECT * FROM users WHERE id = ?', [userId]);
        return row[0];
    } catch (err) {
        return err;
    }
}

const create = async ({ name, lastName, password, email }) => {
    try {
        return await executeQuery('INSERT INTO users (name, last_name, password, email ) values (?,?,?,?)', [name, lastName, password, email]);
    } catch (err) {
        return err;
    }
}

const updateUserInfo = async (userId, userInfo) => {
    try {
        return await executeQuery('UPDATE users SET name = ?, last_name = ?, email = ? WHERE id = ?', [userInfo.name, userInfo.last_name, userInfo.email, userId]);
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
    getUser: getUser,
    getUserById: getUserById,
    create: create,
    updateUserInfo: updateUserInfo
}