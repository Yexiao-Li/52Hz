const Pic_control = {
    async ReadPic(ctx, next){
        ctx.body = ctx.file
        await next()
    },
}

module.exports = Pic_control