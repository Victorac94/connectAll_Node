const getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM users')
    } catch (err) {
        return err;
    }
}

const getUserByEmail = async email => {
    try {
        const row = await executeQuery('SELECT * FROM users WHERE user_email = ?', [email]);
        return row[0];
    } catch (err) {
        return err;
    }
}

const getUsersBySearch = async search => {
    try {
        return await executeQuery('SELECT u.user_name, u.user_last_name, u.user_picture, u.user_register_date, u.id FROM users as u WHERE CONCAT_WS(" ", u.user_name, u.user_last_name) LIKE ? ORDER BY CONCAT(u.user_name, u.user_last_name)', '%' + search + '%')
    } catch (err) {
        return err;
    }
}

const getUserById = async userId => {
    try {
        const row = await executeQuery('SELECT user_name, user_last_name, user_email, user_picture, id FROM users WHERE id = ?', [userId]);
        return row[0];
    } catch (err) {
        return err;
    }
}

const getFullUserById = async userId => {
    try {
        const row = await executeQuery({
            sql: `SELECT posts.*, categories.*, users.user_name, users.user_last_name, users.user_email, users.user_picture, users.id 
        FROM posts JOIN users ON posts.fk_user = users.id 
        JOIN tbi_users_categories as tbi 
        JOIN categories ON categories.id = tbi.fk_category 
        WHERE users.id = ? AND users.id = tbi.fk_user 
        GROUP BY posts.id`, nestTables: true
        }, userId);
        return row;
    } catch (err) {
        return err;
    }
}

const create = async ({ name, lastName, password, email }) => {
    try {
        return await executeQuery('INSERT INTO users (user_name, user_last_name, user_password, user_email ) values (?,?,?,?)', [name, lastName, password, email]);
    } catch (err) {
        return err;
    }
}

const updateUserInfo = async (userId, userInfo) => {
    try {
        return await executeQuery('UPDATE users SET user_name = ?, user_last_name = ?, user_email = ? WHERE id = ?', [userInfo.user_name, userInfo.user_last_name, userInfo.user_email, userId]);
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
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    getFullUserById: getFullUserById,
    create: create,
    updateUserInfo: updateUserInfo,
    getUsersBySearch: getUsersBySearch
}