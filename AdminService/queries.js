const queries = {
    isQueryExist: `
        SELECT COUNT(*) as count
        FROM queries
        WHERE email = ?
    `,
    register: `
        INSERT INTO queries (name, surname, email, password)
	    VALUES (?, ?, ?, MD5(?))
    `,
    getCountQueries: `
        SELECT count(*) as count
        FROM queries
    `,
    deleteQuery: `
        DELETE FROM queries
        WHERE id = ?
    `,
    transferQuery1: `
        SELECT email, name, surname, password
        FROM queries
        WHERE id = ?
    `,
    transferQuery2: `
        INSERT INTO accounts(email, name, surname, password, rank, position)
        values(?, ?, ?, ?, ?, ?);
    `,
    transferQuery3: `
        DELETE FROM queries
        WHERE id = ?
    `,
    getQueries: `
        SELECT id, email, name, surname, regist_date
        FROM queries;
    `,
    getQueryById: `
        SELECT email, name
        FROM queries 
        WHERE id = ?
    `
}

module.exports = { queries };