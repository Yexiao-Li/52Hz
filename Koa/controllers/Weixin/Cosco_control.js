const SerCsc = require('../../sqlservice/SerCsc')
let result = []

const getCosco = async(ctx,next)=>{
    const data = ctx.query
    result = await SerCsc.getInformationById(data.ID)
    ctx.body = result
}

const updateCosco = async(ctx,next)=>{
    const data = ctx.request.body
    result = await SerCsc.upLikeNum(data.LikeNum, data.ID)
    ctx.body = result
}

module.exports = {getCosco, updateCosco}