const SerTog = require('../../sqlservice/Together')

const Together2 = async(togethername) => {
    const together = await SerTog.getInformationBy(togethername)
    return together
}

const Together = async(ctx,next)=>{
    const data = ctx.query
    console.log(data)
    let result = await SerTog.getInformation()
    let tog = 0
    for(let i = 0; i < result.length; i++){
        if(result[i].uservideo == data.uservideo){
            if(result[i].username != data.username){
                await SerTog.addInformation(data.username, data.userimg, data.uservideo)
                await SerTog.addSuccess(result[i].username,data.username)
                await SerTog.addSuccess(data.username,result[i].username)
            }
            await SerTog.addSuccess(result[i].username,data.username)
            await SerTog.addSuccess(data.username,result[i].username)
            const together = await SerTog.getInformationBy(result[i].username)
            tog = 1
            ctx.body = together
            break
        }
    }
    if(tog == 0){
        console.log(1)
        await SerTog.addInformation(data.username, data.userimg, data.uservideo)
        result = await SerTog.getInformationBy(data.username) 
        setInterval(() => {
            if(result[0].togethername){
                console.log("进入")
                const together2 = Together2(result[0].togethername)
                if(together2){
                    clearInterval()
                    ctx.body = together2
                }
            }
            ctx.body = '请等待'
        }, 10000);
    }
}

const Delete = async(ctx,next)=>{
    const data = ctx.query
    console.log(data)
    await SerTog.UpdTog(data.username)
    await SerTog.delInformation(data.username)
    ctx.body = "退出"
}

const Listen = async(ctx,next)=>{
    const data = ctx.query
    let result = await SerTog.getInformationBy(data.username)
    if(result[0].togethername){
        if(data.uservideo){
            await SerTog.UpdVideo(data.uservideo, data.username)
            const togname = await SerTog.getInformationBy(data.username)
            await SerTog.UpdVideo(data.uservideo, togname[0].togethername)
            result = await SerTog.getInformationBy(data.username)
        }
        else if(data.videopause){
            await SerTog.UpdPause(data.videopause, data.username)
            const togname = await SerTog.getInformationBy(data.username)
            await SerTog.UpdPause(data.videopause, togname[0].togethername)
            result = await SerTog.getInformationBy(data.username)
        }
        ctx.body = {video:result[0].uservideo, pause:result[0].videopause}
    }
    else{
        ctx.body = "对方已经退出"
    }
}

module.exports = {
    Together,
    Delete,
    Listen
} 