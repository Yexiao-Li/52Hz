const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routes = require('koa-router')
const cors = require('koa2-cors')
const static = require('koa-static')
const Weixinroute = require('./routes/Weixin')
const Adminroute = require('./routes/Admin')
const Login = require('./routes/Login')

const app = new Koa()
//跨域访问
app.use(cors({
    origin: function (ctx) {
        return '*'
    }
}))

app.use(static(__dirname + '/public'))
//bodyparser解析JSON
app.use(bodyParser({
    formLimit:"10mb",
    jsonLimit:"100mb"
}));

app.use(Weixinroute.routes())
app.use(Adminroute.routes())
app.use(Login.routes())

app.listen(80,()=>{
    console.log(80)
})

module.exports = app