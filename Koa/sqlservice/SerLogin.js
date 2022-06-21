const connection = require('./query')

const adminLogin = {
    async getPassword(name) {
        const statement = `SELECT * FROM user WHERE name = '${name}';`
        const result = await connection.query(statement)
        return result
    }
}

module.exports = adminLogin