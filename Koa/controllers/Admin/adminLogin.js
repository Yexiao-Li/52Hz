const adminLogin = {
    //async函数解决异步操作
    async login(ctx,next){
        ctx.body = ctx.user
        await next()
    },
}

module.exports = adminLogin