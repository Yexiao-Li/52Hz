const Auther = require('../sqlservice/Auther')

const verifyLogin = async(ctx,next)=>{
    //获取用户名和密码
    const {name,password} = ctx.request.body;
    // console.log(ctx.request.body)
    // const username = 'chen'
    // console.log('verifyLogin',name,password)
    const result = await Auther.checkResource(name)
    const user = result[0]
    ctx.user = user; 
    await next()
}

module.exports = {verifyLogin}