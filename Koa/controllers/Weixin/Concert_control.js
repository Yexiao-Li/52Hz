const SerConcert = require('../../sqlservice/SerConcert')

const getConcert = async(ctx,next)=>{
    const singer = ctx.query.name
    const result = await SerConcert.getInformationBySinger(singer)
    ctx.body = result
}

const getConcertby = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerConcert.getInformationByName(name)
    ctx.body = result
}

module.exports = {
    getConcert,
    getConcertby
}