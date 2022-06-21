const connection = require('./query')

const SerUser = {
    async getInformation() {
        const statement = `SELECT * FROM wxuser;`
        const result = await connection.query(statement)
        return result
    },

    async updInformation(id, name, img) {
        let statement = ''
        if(img){
            statement = `UPDATE wxuser SET name = '${name}', img = '${img}' WHERE id = ${id}`
        }
        else{
            statement = `UPDATE wxuser SET name = '${name}' WHERE id = ${id}`
        }
        await connection.query(statement)
    },

    async delInformation(id) {
        const statement = `DELETE FROM wxuser WHERE id = ${id}`
        await connection.query(statement)
    }, 

    async addInformation(name, img){
        const statementexist = `select 1 from wxuser where name = '${name}' limit 1`
        let result = await connection.query(statementexist)
        if(result[0]){
            return result = '用户名已存在'
        }
        else{
            const statement = `INSERT INTO wxuser (name,img) VALUES ('${name}','${img}')`
            await connection.query(statement)
            return result = '增加成功'
        }
    },

    async getidByname(name){
        const statement = `select id from wxuser where name = '${name}'`
        const result = await connection.query(statement)
        return result[0].id
    },

    async getImgByname(name){
        const statement = `select img from wxuser where name = '${name}'`
        const result = await connection.query(statement)
        return result
    },

    async getLikeByname(name){
        const statement = `select Likesinger from wxuser where name = '${name}'`
        const result = await connection.query(statement)
        return result
    },

    async UpdLikeByname(like, name){
        const statement = `UPDATE wxuser SET Likesinger = '${like}'where name = '${name}'`
        await connection.query(statement)
    }
}

module.exports = SerUser