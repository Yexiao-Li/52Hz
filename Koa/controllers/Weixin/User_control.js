const SerUser = require('../../sqlservice/SerUser')
const SerText = require('../../sqlservice/SerText')
const SerComment = require('../../sqlservice/SerComment')

const addUser = async(ctx,next)=>{
    const name = ctx.query.name
    const img = ctx.query.img
    const result = await SerUser.addInformation(name,img)
    ctx.body = result
}

const getUserEditor = async(ctx,next)=>{
    const name = ctx.query.name
    const id = await SerUser.getidByname(name)
    const result = await SerText.getInformationByUser(id)
    ctx.body = result
}

const getCommentEditor = async(ctx,next)=>{
    const name = ctx.query.name
    const id = await SerUser.getidByname(name)
    const result = await SerComment.getInformationByUser(id)
    ctx.body = result
}

const getUserImg = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerUser.getImgByname(name)
    ctx.body = result
}

const getUserLike = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await SerUser.getLikeByname(name)
    ctx.body = result
}

const updUserLike = async(ctx,next)=>{
    const name = ctx.query.name
    const like = ctx.query.like
    await SerUser.UpdLikeByname(like,name)
    const result = await SerUser.getLikeByname(name)
    ctx.body = result
}

module.exports = {
    addUser,
    getUserEditor,
    getCommentEditor,
    getUserImg,
    getUserLike,
    updUserLike
}