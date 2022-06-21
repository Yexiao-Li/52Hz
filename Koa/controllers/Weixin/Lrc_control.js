const Lrc_control = {
    async ReadLrc(ctx, next){
        ctx.body = ctx.file
        console.log(ctx.body)
    },
}

module.exports = Lrc_control