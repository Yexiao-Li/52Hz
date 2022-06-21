const adminPic = require('../../sqlservice/SerPicture')
const PicUpload = require('../../middleware/Admin/Upload')
const fs = require('fs')

const getAllpic = async(ctx,next)=>{
    const result = await adminPic.getInformation()
    ctx.body = result
    await next()
}

const updatePic = async(ctx,next)=>{
    const result = ctx.request.body.params
    let id = await adminPic.getID(result.name)
    await fs.unlink('./public/images/'+result.name,function(){console.log('删除文件')})
    await PicUpload.UpdatePic(ctx,id)
    console.log('更改成功')
    ctx.body = '成功'
}

const deletePic = async(ctx,next)=>{
    const result = ctx.request.body.params
    fs.unlink('./public/images/'+result.name,function(){console.log('删除文件')})
    await adminPic.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

const addPic = async(ctx,next)=>{
    await PicUpload.UploadPic(ctx)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports = {
    getAllpic,
    updatePic,
    deletePic,
    addPic
}