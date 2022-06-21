const connection = require('./query')
const formatDate = require('../utils/index')

const SerConcert = {
    async getInformation() {
        const statement = `SELECT * FROM vocal_concert;`
        const result = await connection.query(statement)
        return result
    },
    async updInformation(singer, time, place, name, url, introduce, id) {
        const date = formatDate("YY-MM-dd hh:mm:ss",time)
        const statement = `UPDATE vocal_concert SET singer = '${singer}', time = '${date}', place = '${place}', name = '${name}', url = '${url}', introduce = '${introduce}' WHERE ID = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM vocal_concert WHERE ID = ${id}`
        await connection.query(statement)
    },

    async addInformation(singer, time, place, url, introduce, name) {
        const date = formatDate("YY-MM-dd hh:mm:ss",time)
        const statement = `INSERT INTO vocal_concert (singer, time, place, name, url, introduce) VALUES ('${singer}','${date}','${place}','${name}','${url}','${introduce}')`
        await connection.query(statement)
    },

    async getInformationBySinger(singer){
        const statement = `SELECT * FROM vocal_concert WHERE singer = '${singer}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByName(name){
        const statement = `SELECT * FROM vocal_concert WHERE name = '${name}'`
        const result = await connection.query(statement)
        return result
    }
}

module.exports = SerConcert