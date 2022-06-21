const connection = require('./query')

const SerSong = {
    async getInformation() {
        const statement = `SELECT * FROM song;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(name, type, singer, album, id) {
        const statement = `UPDATE song SET name = '${name}', type = '${type}', singer = '${singer}', album = '${album}' WHERE id = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM song WHERE id = ${id}`
        await connection.query(statement)
    },

    async addInformation(name, type, singer, album) {
        const statement = `INSERT INTO song (name,type,singer,album) VALUES ('${name}','${type}','${singer}','${album}')`
        await connection.query(statement)
    },

    async getInformationBySinger(name){
        const statement = `SELECT * FROM song WHERE singer = '${name}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByAlbum(name){
        const statement = `SELECT * FROM song WHERE album = '${name}'`
        const result = await connection.query(statement)
        return result
    },

    async getNameByID(id){
        const statement = `SELECT name FROM song WHERE id = '${id}'`
        const result = await connection.query(statement)
        return result[0].name
    },

    async delInformationBymusic(name, singer){
        const statement = `DELETE FROM song WHERE name = '${name}' AND singer = '${singer}'`
        console.log(statement)
        await connection.query(statement)
    }
}

module.exports = SerSong