const adminVocal = require('../../sqlservice/SerConcert')

const getVocal = async(ctx,next)=>{
    const result = await adminVocal.getInformation()
    ctx.body = result
    await next()
}

const updateVocal = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminVocal.updInformation(result.singer,result.time,result.place,result.name,result.url,result.introduce,result.id)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteVocal = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminVocal.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

const addVocal = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminVocal.addInformation(result.singer,result.time,result.place,result.name,result.url,result.introduce)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports = {
    getVocal,
    updateVocal,
    deleteVocal,
    addVocal
}