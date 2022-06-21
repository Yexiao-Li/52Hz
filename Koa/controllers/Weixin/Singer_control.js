const SerSinger = require('../../sqlservice/SerSinger')

const getSinger = async(ctx,next)=>{
    const singer = ctx.query
    const result = await SerSinger.getInformationBy(singer)
    ctx.body = result
}

const getSingerByname = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerSinger.getInformationByName(name)
    ctx.body = result
}

module.exports = {
    getSinger,
    getSingerByname
}