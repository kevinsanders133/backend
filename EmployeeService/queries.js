const queries = {
    getNumberOfDays: `
        SELECT COUNT(*) as count
        FROM user_graphic 
        WHERE date = ? 
        AND user = ?
    `,
    getDayForUserByDate: `
        SELECT time_from, time_to
        FROM user_graphic
        WHERE date = ?
    `,
    addDay: `
        INSERT INTO user_graphic (user, date, time_from, time_to, notes)
        VALUES (?, ?, ?, ?, ?)
    `,
    deleteUserDay: `
        DELETE FROM user_graphic
        WHERE user = ?
        AND date = ?
    `,
    isDayExistForAll: `
        SELECT COUNT(*) as count
        FROM user_graphic 
        WHERE date = ?
    `,
    getDayUsersByDate: `
        SELECT user_graphic.id, user, date, time_from, time_to, notes, accounts.name, accounts.surname, accounts.position, positions.position pos
        FROM user_graphic
        LEFT JOIN accounts ON user_graphic.user = accounts.id
        LEFT JOIN positions ON accounts.position = positions.id
        WHERE date = ?
    `,
    getDayById: `
        SELECT user_graphic.id, user, date, time_from, time_to, notes, accounts.name, accounts.surname, accounts.position, positions.position pos
        FROM user_graphic
        LEFT JOIN accounts ON user_graphic.user = accounts.id
        LEFT JOIN positions ON accounts.position = positions.id
        WHERE user_graphic.id = ?
    `,
    transferDayFromUserToFirm: `
        INSERT INTO firm_graphic (user, date, time_from, time_to, notes)
        VALUES (?, ?, ?, ?, ?)
    `,
    getDayFirmByDate: `
        SELECT firm_graphic.id, user, date, time_from, time_to, notes, accounts.name, accounts.surname, accounts.position, positions.position pos
        FROM firm_graphic
        LEFT JOIN accounts ON firm_graphic.user = accounts.id
        LEFT JOIN positions ON accounts.position = positions.id
        WHERE date = ?
    `,
    isGrafikTransferred: `
        SELECT COUNT(*) as count
        FROM firm_graphic 
        WHERE date = ?
        AND user = ?
    `,
    deleteDayForUserFromFirmGraphic: `
        DELETE FROM firm_graphic
        WHERE user = ?
        AND date = ?
    `,
    isDayReady: `
        SELECT COUNT(*) as count
        FROM firm_graphic 
        WHERE date = ?
    `,
    getReadyDayForUser: `
        SELECT time_from, time_to
        FROM firm_graphic
        WHERE date = ?
        AND user = ?
    `,
}

module.exports = { queries };