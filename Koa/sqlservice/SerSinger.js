const connection = require('./query')

const SerSinger = {
    async getInformation() {
        const statement = `SELECT * FROM singer;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(Name, Sex, Class, img, ID) {
        const statement = `UPDATE singer SET Name = '${Name}', Sex = '${Sex}', Class = '${Class}', img = '${img}' WHERE ID = '${ID}'`
        await connection.query(statement)
    },

    async delInformation(ID) {
        const statement = `DELETE FROM singer WHERE ID = ${ID}`
        await connection.query(statement)
    },

    async addInformation(Name, Sex, Class, img) {
        const statement = `INSERT INTO singer (Name,Sex,Class,img) VALUES ('${Name}','${Sex}','${Class}','${img}')`
        await connection.query(statement)
    },

    async getInformationBy(admin){
        const statement = `SELECT * FROM singer WHERE Sex = '${admin.Sex}' AND Class = '${admin.Class}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByName(name){
        const statement = `SELECT * FROM singer WHERE Name = '${name}'`
        const result = await connection.query(statement)
        return result
    },
}

module.exports = SerSinger