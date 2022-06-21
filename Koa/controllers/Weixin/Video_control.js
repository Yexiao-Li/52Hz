const Video_control = {
    async ReadVideo(ctx, next){
        if(ctx.file){
            ctx.body = ctx.file
        }
    },
}

module.exports = Video_control