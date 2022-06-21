const SerAlbum = require('../../sqlservice/SerAlbum')
const SerSong = require('../../sqlservice/SerSong')

const getAlbum = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerAlbum.getInformationByName(name)
    ctx.body = result
}

const getAlbumSong = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerSong.getInformationByAlbum(name)
    ctx.body = result
}

module.exports = {
    getAlbum,
    getAlbumSong
}