const connection = require('./query')

const SerComment = {
    async getInformation() {
        const statement = `SELECT * FROM comment;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(text, id) {
        const statement = `UPDATE comment SET Text = '${text}' WHERE ID = ${id}`
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM comment WHERE ID = ${id}`
        await connection.query(statement)
    },

    async addInformation(text, userid, id, username, time) {
        const statement = `INSERT INTO comment (Text,userID,textID,LikeNum,CommentNum,userName) VALUES ('${text}','${userid}','${id}',0,0,'${username}')`
        await connection.query(statement)
    },

    async getInformationById(id){
        const statement = `SELECT * FROM comment WHERE textID = '${id}'`
        const result = await connection.query(statement)
        return result
    },

    async getIDById(id){
        const statement = `SELECT 1 FROM comment WHERE textID = '${id}' limit 1`
        let result = await connection.query(statement)
        if(result[0]){
            const statement2 = `SELECT ID FROM comment WHERE textID = '${id}'`
            result = await connection.query(statement2)
        }
        return result[0]
    },

    async getInformationByID(ID){
        const statement = `SELECT * FROM comment WHERE ID = '${ID}'`
        const result = await connection.query(statement)
        return result
    },
    
    async upLikeNum(LikeNum,CommentNum,ID){
        const statement = `UPDATE comment SET LikeNum = '${LikeNum}', CommentNum = '${CommentNum}' WHERE ID = '${ID}'`
        const result = await connection.query(statement)
        return result
    },

    async getInformationByUser(id){
        const statement = `SELECT * FROM comment WHERE userID = '${id}'`
        const result = await connection.query(statement)
        return result
    }
}

module.exports = SerComment