const router = require('koa-router')()
const verifyLogin = require('../middleware/Admin/adminHome')
const {login} = require('../controllers/Admin/adminLogin')

router.prefix('/login')

router.get('/verify',verifyLogin,login)

module.exports = router