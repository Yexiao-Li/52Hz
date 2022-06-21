const connection = require('./query')

const SerText = {
    async getInformation() {
        const statement = `SELECT * FROM editor;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(Text, Class, ID) {
        const statement = `UPDATE editor SET Text = '${Text}', Class = '${Class}' WHERE ID = ${ID}`
        console.log(statement)
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM editor WHERE ID = ${id}`
        await connection.query(statement)
    },

    async addInformation(text, id, username, Class, time){
        const statement = `INSERT INTO editor (Text,userID,Time,LikeNum,Class,CommentNum,userName) VALUES ('${text}','${id}','${time}',0,'${Class}',0,'${username}')`
        const statement2 = `select max(ID) from editor;`
        await connection.query(statement)
        const result = await connection.query(statement2)
        return result
    },

    async getInformationById(id){
        const statement = `SELECT * FROM editor WHERE ID = '${id}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByUser(id){
        const statement = `SELECT * FROM editor WHERE userID = '${id}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByClass(quan){
        const statement = `SELECT * FROM editor WHERE Class = '${quan}'`
        const result = await connection.query(statement)
        return result
    },
    
    async upLikeNum(LikeNum,CommentNum,ID){
        const statement = `UPDATE editor SET LikeNum = '${LikeNum}', CommentNum = '${CommentNum}' WHERE ID = '${ID}'`
        const result = await connection.query(statement)
        return result
    },
}

module.exports = SerText