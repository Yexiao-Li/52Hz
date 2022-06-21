const Video = require('../../sqlservice/SerVideo')
const Song = require('../../sqlservice/SerSong')
const mime = require('mime-types')
const path = require('path')
const fs = require('fs')

//读取路径
function getPath(name) {
    let file = null
    let filepath = null
    filepath = path.join(__dirname,`../../public/lrcs/${name}`)
    file = fs.readFileSync(filepath)
    return {file,filepath}
}

const getLrc = async(ctx,next)=>{
    const id = ctx.query.id
    const name = await Song.getNameByID(id)
    const result = await Video.getLrcByName(name)
    obj = getPath(result.lrc)
    let mimeType = mime.lookup(obj.filepath)
    ctx.set('content-type',mimeType)
    ctx.file = obj.file
    await next()
}

module.exports = {
    getLrc
} 