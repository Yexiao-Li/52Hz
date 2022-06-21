const adminSinger = require('../../sqlservice/SerSinger')
const PicUpload = require('../../middleware/Admin/Upload')

const getSinger = async(ctx,next)=>{
    const result = await adminSinger.getInformation()
    ctx.body = result
    await next()
}

const updateSinger = async(ctx,next)=>{
    const result = ctx.request.body.params
    let img = ''
    if(result.img){
        await PicUpload.UpdatePic(ctx)
        img = 'http://49.233.35.127/Wx/Getpic?id=' + result.img.file.uid
    }
    await adminSinger.updInformation(result.name,result.Sex,result.Class,img,result.ID)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteSinger = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminSinger.delInformation(result.ID)
    console.log('删除成功')
    ctx.body = '成功'
}

const addSinger = async(ctx,next)=>{
    const result = ctx.request.body.params
    let img = ''
    if(result.img){
        await PicUpload.UploadPic(ctx)
        img = 'http://49.233.35.127/Wx/Getpic?id=' + result.img.file.uid
    }
    await adminSinger.addInformation(result.name,result.Sex,result.Class,img)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports={
    getSinger,
    updateSinger,
    deleteSinger,
    addSinger
}