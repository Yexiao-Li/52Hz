const Serupload = require('../../sqlservice/SerPicture')
const SerVupload = require('../../sqlservice/SerVideo')
const fs = require('fs')

const UploadPic = async(ctx) => {
    const result = ctx.request.body.params
    const base = result.img.fileList[0].thumbUrl.slice(result.img.fileList[0].thumbUrl.indexOf(',')+1)
    const type = result.img.fileList[0].name.slice(result.img.fileList[0].name.indexOf('.'))
    var dataBuffer = Buffer.from(base, 'base64');
    fs.writeFile('./public/images/'+result.name+type, dataBuffer, function(err) {
        if(err){
          console.log(err);
        }else{
          console.log("图片保存成功！");
        }
    })
    await Serupload.addPic(result.name+type, '/usr/local/share/52Hz/52Hz-backstage/public/images/'+result.name+type, result.img.file.uid)
}

const UpdatePic = async(ctx) => {
    const result = ctx.request.body.params
    const base = result.img.fileList[0].thumbUrl.slice(result.img.fileList[0].thumbUrl.indexOf(',')+1)
    let type = result.img.fileList[0].name.slice(result.img.fileList[0].name.indexOf('.'))
    let name = ''
    if(result.name.indexOf('.')!=-1){
        name = result.name.slice(0,result.name.indexOf('.'))
    }
    else{name = result.name}
    var dataBuffer = Buffer.from(base, 'base64')
    console.log('./public/images/'+name+type)
    fs.writeFile('./public/images/'+result.name+type, dataBuffer, function(err) {
        if(err){
          console.log(err);
        }else{
          console.log("图片保存成功！");
        }
    })
    await Serupload.updInformation(result.name, '/usr/local/share/52Hz/52Hz-backstage/public/images/'+name+type, result.img.file.uid)
}

const UploadAudio = async(ctx) => {
    const result = ctx.request.body.params
    const base = result.audio.fileList[0].thumbUrl.slice(result.audio.fileList[0].thumbUrl.indexOf(',')+1)
    const type = result.audio.fileList[0].name.slice(result.audio.fileList[0].name.indexOf('.'))
    var dataBuffer = Buffer.from(base, 'base64');
    const audioname = result.name + '-' + result.singer + type
    fs.writeFile('./public/videos/'+audioname, dataBuffer, function(err) {
        if(err){
          console.log(err);
        }else{
          console.log("音乐保存成功！");
        }
    })
    await SerVupload.addInformation(result.name + '-' + result.singer, type, result.name + '-' + result.singer+'.lrc', result.singer)
}

const UpdateAudio = async(ctx, id) => {
    const result = ctx.request.body.params
    const base = result.audio.fileList[0].thumbUrl.slice(result.audio.fileList[0].thumbUrl.indexOf(',')+1)
    const type = result.audio.fileList[0].name.slice(result.audio.fileList[0].name.indexOf('.'))
    var dataBuffer = Buffer.from(base, 'base64');
    const audioname = result.name + '-' + result.singer + type
    fs.writeFile('./public/videos/'+audioname, dataBuffer, function(err) {
        if(err){
          console.log(err);
        }else{
          console.log("音乐保存成功！");
        }
    })
    console.log(id)
    await SerVupload.updInformation(result.name + '-' + result.singer, type, result.name + '-' + result.singer+'.lrc', result.singer, id)
}

module.exports = {
    UploadPic,
    UpdatePic,
    UploadAudio,
    UpdateAudio
}