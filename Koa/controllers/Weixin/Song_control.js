const SerSong = require('../../sqlservice/SerSong')

const getSong = async(ctx,next)=>{
    const singername = ctx.query.name
    const result = await SerSong.getInformationBySinger(singername)
    ctx.body = result
}

module.exports = {getSong}