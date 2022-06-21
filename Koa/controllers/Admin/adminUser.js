const adminUser = require('../../sqlservice/SerUser')

const getUser = async(ctx,next)=>{
    const result = await adminUser.getInformation()
    ctx.body = result
    await next()
}

const updateUser = async(ctx,next)=>{
    const result = ctx.request.body.params
    console.log(result)
    await adminUser.updInformation(result.id, result.name)
    console.log('更改成功')
    ctx.body = '成功'
}

const deleteUser = async(ctx,next)=>{
    const result = ctx.request.body.params
    await adminUser.delInformation(result.id)
    console.log('删除成功')
    ctx.body = '成功'
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}