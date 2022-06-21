const connection = require('./query')

const SeradminMaster = {
    async getInformation() {
        const statement = `SELECT * FROM user;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(name, password, id) {
        const statement = `UPDATE user SET name = '${name}', password = '${password}' WHERE id = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM user WHERE id = ${id}`
        await connection.query(statement)
    },

    async addInformation(name, password) {
        const statement = `INSERT INTO user (name,password) VALUES ('${name}','${password}')`
        await connection.query(statement)
    },
}

module.exports = SeradminMaster