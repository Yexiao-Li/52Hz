//创建mysql连接

const mysql = require('mysql')
const mysqlconfig = require('../config/mysql-config')

//mysql池子

const connections = mysql.createPool(mysqlconfig)

//query sql请求语句，封装了一个query方法 用于对本地数据进行操作
function query(sql){
    //开启异步
    return new Promise((resolve,reject) =>{
        //promise接受两个函数形参
        connections.getConnection((err,connection)=>{
            if(err){
                console.log(err);
            }
            else{
                connection.query(sql,function(err,results){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(results)
                    }
                    //释放
                    connection.release()
                })
            }
        })
    })
}

module.exports.query = query