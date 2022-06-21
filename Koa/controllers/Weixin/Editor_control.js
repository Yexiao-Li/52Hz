const SerEditor = require('../../sqlservice/SerText')
const SerUser = require('../../sqlservice/SerUser')
let result = []

const getEditor = async(ctx,next)=>{
    const data = ctx.query
    if(!data.id){
        result = await SerEditor.getInformationByClass(data.class)
    }
    else{
        result = await SerEditor.getInformationById(data.ID)
    }
    ctx.body = result
}

const updateEditor = async(ctx,next)=>{
    const data = ctx.request.body
    await SerEditor.upLikeNum(data.LikeNum, data.CommentNum, data.ID)
    ctx.body = '修改成功'
}

const deleteEditor = async(ctx,next)=>{
    const data = ctx.request.body
    console.log(data)
    await SerEditor.delInformation(data.id)
    ctx.body = '删除成功'
}

const addEditor = async(ctx,next)=>{
    const data = ctx.request.body
    const id = await SerUser.getidByname(data.username)
    const ID = await SerEditor.addInformation(data.text, id, data.username, data.Class, data.time)
    ctx.body = ID
}

module.exports = {
    getEditor, 
    updateEditor, 
    deleteEditor,
    addEditor
}