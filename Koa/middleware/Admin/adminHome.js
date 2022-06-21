const adminLogin = require('../../sqlservice/SerLogin')

const verifyLogin = async(ctx,next)=>{
    //获取用户名和密码
    const{name,password} = ctx.query
    const result = await adminLogin.getPassword(name)
    if(result !== []){
        if(result[0].password !== password){
            ctx.body = '密码错误'
            return
        }
        ctx.user = result
        await next()
        return
    }else{ctx.body = '用户不存在'}
}

module.exports = verifyLogin