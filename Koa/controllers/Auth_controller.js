const AuthController = {
    //async函数解决异步操作
    async login(ctx,next){
        ctx.body = ctx.user
        await next()
    },

    async success(ctx,next){
        ctx.body = '授权成功'
        await next()
    }
}

module.exports = AuthController