const getAll = async () => {
    try {
        return await executeQuery('SELECT * FROM users')
    } catch (err) {
        return err;
    }
}

const getUser = async email => {
    try {
        const row = await executeQuery('SELECT * FROM users WHERE user_email = ?', [email]);
        return row[0];
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
        // const row = await executeQuery('SELECT posts.*, categories.*, users.user_name, users.user_last_name, users.user_email, users.user_picture, users.id FROM posts, categories, tbi_users_categories tbi, users WHERE posts.fk_user = users.id AND tbi.fk_user = users.id AND users.id = ?', userId);
        const row = await executeQuery('SELECT posts.*, categories.*, users.user_name, users.user_last_name, users.user_email, users.user_picture, users.id FROM posts JOIN users ON posts.fk_user = users.id JOIN tbi_users_categories as tbi JOIN categories ON categories.id = tbi.fk_category AND users.id = tbi.fk_user WHERE users.id = ?', userId);
        console.log(row);
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
        return await executeQuery('UPDATE users SET user_name = ?, user_last_name = ?, user_email = ? WHERE id = ?', [userInfo.name, userInfo.last_name, userInfo.email, userId]);
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
    getFullUserById: getFullUserById,
    create: create,
    updateUserInfo: updateUserInfo
}