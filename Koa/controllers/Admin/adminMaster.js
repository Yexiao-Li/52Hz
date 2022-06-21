const adminMaster = require('../../sqlservice/SeradminMaster')

const getMaster = async(ctx,next)=>{
    //获取管理人员信息
    const result = await adminMaster.getInformation()
    ctx.body = result
    await next()
}

const updateMaster = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminMaster.updInformation(result.name,result.password,result.id)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteMaster = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminMaster.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

const addMaster = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminMaster.addInformation(result.name,result.password)
    console.log('增加成功')
    ctx.body = '成功'
}

module.exports = {
    getMaster,
    updateMaster,
    deleteMaster,
    addMaster
}