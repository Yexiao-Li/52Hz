const SerComment = require('../../sqlservice/SerComment')
const SerUser = require('../../sqlservice/SerUser')
let result = []

const getComment = async(ctx,next)=>{
    const data = ctx.query
    if(data.ID){
        result = await SerComment.getInformationByID(data.ID)
        ctx.body = result
        return
    }
    else{result = await SerComment.getInformationById(data.textID)}
    ctx.body = result
}

const updateComment = async(ctx,next)=>{
    const data = ctx.request.body
    result = await SerComment.upLikeNum(data.LikeNum, data.CommentNum, data.ID)
    console.log(result)
    ctx.body = result
}

const deleteComment = async(ctx,next)=>{
    const data = ctx.request.body
    await SerComment.delInformation(data.id)
    ctx.body = '删除成功'
}

const addComment = async(ctx,next)=>{
    const data = ctx.request.body
    const userid = await SerUser.getidByname(data.username)
    await SerComment.addInformation(data.text, userid, data.textID, data.username)
    ctx.body = '增加成功'
}

const getCommentbyUser = async(ctx,next)=>{
    const data = ctx.request.body
    console.log(data)
    const userid = await SerUser.getidByname(data.username)
    await SerComment.getCommentbyUser(userid)
    ctx.body = '增加成功'
}

module.exports = {getComment, updateComment, deleteComment, addComment, getCommentbyUser}