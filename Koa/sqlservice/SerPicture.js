const connection = require('./query')

const Picture = {
    async getInformation() {
        const statement = `SELECT * FROM pic;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(name, url, id) {
        const statement = `UPDATE pic SET id = '${id}', url = '${url}' WHERE name = '${name}'`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM pic WHERE id = '${id}'`
        await connection.query(statement)
    },

    async getPicturebyID(id){
        const statement = `SELECT name FROM pic WHERE id = '${id}'`
        const result = await connection.query(statement)
        return result[0]
    },

    async delByname(name){
        const statement = `DELETE FROM pic WHERE name = ${name}`
        const result = await connection.query(statement)
        return result[0]
    },

    async addPic(name, url, id){
        const statement = `INSERT INTO pic (name,url,id) VALUES ('${name}','${url}','${id}')`
        await connection.query(statement)
    },

    async getID(name){
        const statement = `SELECT id FROM pic WHERE name = '${name}';`
        const result = await connection.query(statement)
        return result[0].id
    }
}

module.exports = Picture