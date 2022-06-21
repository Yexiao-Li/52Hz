const adminEditor = require('../../sqlservice/SerText')
const adminComment = require('../../sqlservice/SerComment')
const adminCsc = require('../../sqlservice/SerCsc')

const getEditor = async(ctx,next)=>{
    const result = await adminEditor.getInformation()
    ctx.body = result
    await next()
}

const updateEditor = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminEditor.updInformation(result.Text,result.Class,result.ID)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteEditor = async(ctx,next)=>{
    const result = ctx.request.body.params
    const ID = await adminComment.getIDById(result.id)
    if(ID){
        await adminComment.delInformation(ID.ID)
        await adminCsc.delInformationBy(ID.ID)
    }
    await adminEditor.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

module.exports = {
    getEditor,
    updateEditor,
    deleteEditor
}