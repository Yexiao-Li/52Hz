const adminVideo = require('../../sqlservice/SerVideo')
const adminSong = require('../../sqlservice/SerSong')
const fs = require('fs')

const getAllVideo = async(ctx,next)=>{
    const result = await adminVideo.getInformation()
    ctx.body = result
    await next()
}

const deleteVideo = async(ctx,next)=>{
    const result = ctx.request.body.params
    console.log('./public/videos/' + result.name + result.type)
    await fs.unlink('./public/videos/' + result.name + result.type, function(){console.log('删除文件')})
    const name = result.name.slice(0,result.name.indexOf('-'))
    console.log(name)
    await adminVideo.delInformation(result.id)
    await adminSong.delInformationBymusic(name, result.singer)
    console.log('删除成功')
    ctx.body = '成功'
}

module.exports = {
    getAllVideo,
    deleteVideo
}