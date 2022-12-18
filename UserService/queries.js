const queries = {
    register: `
        INSERT INTO queries (name, surname, email, password)
	    VALUES (?, ?, ?, MD5(?))
    `,
    checkUserData: `
        SELECT * FROM accounts 
        WHERE email = ?
        AND password = MD5(?)
    `,
    getUsers: `
        SELECT id, email, name, surname, rank, last_online, regist_date, position
        FROM accounts 
        WHERE (name LIKE ? OR surname LIKE ? OR email LIKE ?)
    `,
    checkEmailExists: `
        SELECT COUNT(*) as count
        FROM accounts 
        WHERE email = ?
    `,
    refreshOnline: `
        UPDATE accounts 
        SET last_online = ?
        WHERE id = ?
    `,
}

module.exports = { queries };