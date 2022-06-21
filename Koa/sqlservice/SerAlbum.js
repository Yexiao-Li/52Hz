const connection = require('./query')
const formatDate = require('../utils/index')

const SerAlbum = {
    async getInformation() {
        const statement = `SELECT * FROM album;`
        const result = await connection.query(statement)
        return result
    },
    async updInformation(singer, name, song, img, id) {
        const statement = `UPDATE album SET singer = '${singer}', name = '${name}', song = '${song}', img = '${img}' WHERE id = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM album WHERE id = ${id}`
        await connection.query(statement)
    },

    async addInformation(singer, name, song, img) {
        const statement = `INSERT INTO album (singer, name, song, img) VALUES ('${singer}','${name}','${song}','${img}')`
        await connection.query(statement)
    },

    async getInformationByName(name){
        const statement = `SELECT * FROM album WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result
    }
}

module.exports = SerAlbum