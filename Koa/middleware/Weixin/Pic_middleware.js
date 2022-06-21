const Picture = require('../../sqlservice/SerPicture')
const mime = require('mime-types')
const path = require('path')
const fs = require('fs')

//读取路径
function getPath(name) {
    let file = null
    let filepath = null
    filepath = path.join(__dirname,`../../public/images/${name}`)
    file = fs.readFileSync(filepath)
    return {file,filepath}
}

const getPic = async(ctx,next)=>{
    const id = ctx.query.id
    const result = await Picture.getPicturebyID(id)
    obj = getPath(result.name)
    let mimeType = mime.lookup(obj.filepath)
    ctx.set('content-type',mimeType)
    ctx.file = obj.file
    await next()
}

module.exports = {
    getPic
} 