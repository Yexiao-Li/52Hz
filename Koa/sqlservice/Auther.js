const connection = require('./query')

const Auther = {
    async checkResource(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`
        const result = await connection(statement,[name])
        return result
    }
}

module.exports = Auther