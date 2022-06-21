const connection = require('./query')

const Search = {
    async getsinger(name){
        const statement = `SELECT * FROM singer WHERE Name Like '%${name}%'`
        const result = await connection.query(statement)
        return result
    },

    async getLrcByName(name){
        const statement = `SELECT lrc FROM video WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result[0]
    }
}

module.exports = Search