const adminSong = require('../../sqlservice/SerSong')
const audioUpload = require('../../middleware/Admin/Upload')
const adminVideo = require('../../sqlservice/SerVideo')
const fs = require('fs')

const getSong = async(ctx,next)=>{
    const result = await adminSong.getInformation()
    ctx.body = result
    await next()
}

const updateSong = async(ctx,next)=>{
    const result = ctx.request.body.params
    let name = result.name+'-'+result.singer
    const type = await adminVideo.getTypeByName(name)
    await fs.unlink('./public/videos/' + result.name + '-' + result.singer + type.type, function(){console.log('删除文件')})
    let id = await adminVideo.getIDByname(name)
    await audioUpload.UpdateAudio(ctx, id)
    await adminSong.updInformation(result.name,result.type,result.singer,result.album,result.id)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteSong = async(ctx,next)=>{
    const result = ctx.request.body.params
    let name = result.name+'-'+result.singer
    const type = await adminVideo.getTypeByName(name)
    await fs.unlink('./public/videos/' + name + type.type, function(){console.log('删除文件')})
    await adminSong.delInformation(result.id)
    await adminVideo.delInformationByname(name)
    console.log('删除成功')
    ctx.body = '成功'
}

const addSong = async(ctx,next)=>{
    const result = ctx.request.body.params
    await audioUpload.UploadAudio(ctx)
    await adminSong.addInformation(result.name,result.type,result.singer,result.album)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports = {
    getSong,
    updateSong,
    deleteSong,
    addSong
}