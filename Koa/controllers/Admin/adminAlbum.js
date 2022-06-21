const adminAlbum = require('../../sqlservice/SerAlbum')

const getAlbum = async(ctx,next)=>{
    const result = await adminAlbum.getInformation()
    ctx.body = result
    await next()
}

const updateAlbum = async(ctx,next)=>{
    const result = ctx.request.body.params
    console.log(result)
    await adminAlbum.updInformation(result.singer,result.name,result.song,result.img,result.id)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteAlbum = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminAlbum.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

const addAlbum = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminAlbum.addInformation(result.singer,result.name,result.song,result.img)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports = {
    getAlbum,
    updateAlbum,
    deleteAlbum,
    addAlbum
}