const connection = require('./query')

const getTogether = {
    async getInformation() {
        const statement = `SELECT * FROM Together;`
        const result = await connection.query(statement)
        return result
    },

    async addInformation(username, userimg, uservideo) {
        const statement = `INSERT INTO Together (username, userimg, uservideo) VALUES ('${username}','${userimg}','${uservideo}')`
        await connection.query(statement)
    },

    async updateInformation(username, userimg, uservideo, ID) {
        const statement = `UPDATE Together SET username = '${username}', userimg = '${userimg}', uservideo = '${uservideo}' WHERE ID = ${ID}`
        await connection.query(statement)
    },

    async getInformationBy(name) {
        const statement = `SELECT * FROM Together WHERE username = '${name}';`
        const result = await connection.query(statement)
        return result
    },

    async addSuccess(username, name){
        const statement = `UPDATE Together SET togethername = '${name}', videopause = 0 WHERE username = '${username}'`
        await connection.query(statement)
    },

    async delInformation(name) {
        const statement = `DELETE FROM Together WHERE username = '${name}'`
        await connection.query(statement)
    },

    async UpdTog(name) {
        const statement = `UPDATE Together SET togethername = null WHERE togethername = '${name}'`
        await connection.query(statement)
    },

    async UpdVideo(video, name) {
        const statement = `UPDATE Together SET uservideo = '${video}' WHERE togethername = '${name}'`
        console.log(statement)
        await connection.query(statement)
    },

    async UpdPause(pause, name) {
        const statement = `UPDATE Together SET videopause = '${pause}' WHERE togethername = '${name}'`
        await connection.query(statement)
    }
}

module.exports = getTogether