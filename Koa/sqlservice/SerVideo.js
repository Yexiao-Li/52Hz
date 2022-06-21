const connection = require('./query')

const Video = {
    async getInformation() {
        const statement = `SELECT * FROM video;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(name, type, lrc, singer, id) {
        const statement = `UPDATE video SET name = '${name}', type = '${type}', lrc = '${lrc}', singer = '${singer}' WHERE ID = ${id}`
        console.log(statement)
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM video WHERE ID = '${id}'`
        await connection.query(statement)
    },

    async delInformationByname(name) {
        const statement = `DELETE FROM video WHERE name = '${name}'`
        await connection.query(statement)
    },

    async addInformation(name, type, lrc, singer) {
        const statement = `INSERT INTO video (name,type,lrc,singer) VALUES ('${name}','${type}','${lrc}','${singer}')`
        await connection.query(statement)
    },

    async getTypeByName(name){
        const statement = `SELECT type FROM video WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result[0]
    },

    async getLrcByName(name){
        const statement = `SELECT lrc FROM video WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result[0]
    },

    async getIDByname(name){
        const statement = `SELECT ID FROM video WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result[0].ID
    }
}

module.exports = Video