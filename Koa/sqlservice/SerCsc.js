const connection = require('./query')

const SerCsc = {
    async getInformation() {
        const statement = `SELECT * FROM cosco;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(text, id) {
        const statement = `UPDATE cosco SET Text = '${text}' WHERE ID = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM cosco WHERE ID = ${id}`
        await connection.query(statement)
    },

    async delInformationBy(id) {
        const statement = `DELETE FROM cosco WHERE commentID = ${id}`
        await connection.query(statement)
    },

    async getInformationById(ID){
        const statement = `SELECT * FROM cosco WHERE commentID = '${ID}'`
        const result = await connection.query(statement)
        return result
    },
    
    async upLikeNum(LikeNum, ID){
        const statement = `UPDATE editor SET LikeNum = '${LikeNum}' WHERE ID = '${ID}'`
        const result = await connection.query(statement)
        return result
    },
}

module.exports = SerCsc