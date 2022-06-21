const adminComment = require('../../sqlservice/SerComment')
const adminCsc = require('../../sqlservice/SerCsc')

const getComment = async(ctx,next)=>{
    const result = await adminComment.getInformation()
    const result2 = await adminCsc.getInformation()
    for(let i = 0; i < result2.length; i++){
        result.push(result2[i])
    }
    ctx.body = result
    await next()
}

const updateComment = async(ctx,next)=>{
    const result = ctx.request.body.params
    if(result.textID){
        await adminComment.updInformation(result.Text,result.ID)
    }
    else{
        await adminCsc.updInformation(result.Text,result.ID)
    }
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteComment = async(ctx,next)=>{
    const result = ctx.request.body.params
    console.log(result)
    if(result.textID){
        await adminComment.delInformation(result.id)
        await adminCsc.delInformationBy(result.id)
    }
    else{
        await adminCsc.delInformation(result.id)
    }
    console.log('删除成功')
    ctx.body = '成功'
}

module.exports = {
    getComment,
    updateComment,
    deleteComment
}