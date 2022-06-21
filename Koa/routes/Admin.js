const router = require('koa-router')()
const { getUser, updateUser, deleteUser} = require('../controllers/Admin/adminUser')
const { getMaster, updateMaster, deleteMaster, addMaster} = require('../controllers/Admin/adminMaster')
const { getSong, updateSong, deleteSong, addSong} = require('../controllers/Admin/adminSong')
const { getSinger, updateSinger, deleteSinger, addSinger} = require('../controllers/Admin/adminSinger')
const { getVocal, updateVocal, deleteVocal, addVocal} = require('../controllers/Admin/adminVocal')
const { getEditor, updateEditor, deleteEditor} = require('../controllers/Admin/adminEditor')
const { getComment, updateComment, deleteComment} = require('../controllers/Admin/adminComment')
const { getAlbum, updateAlbum, deleteAlbum, addAlbum} = require('../controllers/Admin/adminAlbum')
const { getAllpic, updatePic, deletePic, addPic } = require('../controllers/Admin/adminPic')
const { getAllVideo, deleteVideo } = require('../controllers/Admin/adminVideo')

router.prefix('/admin')

router.get('/home')

router.get('/user', getUser)
router.post('/user/update', updateUser)
router.post('/user/delete', deleteUser)

router.get('/master', getMaster)
router.post('/master/update', updateMaster)
router.post('/master/delete', deleteMaster)
router.post('/master/add', addMaster)

router.get('/song', getSong)
router.post('/song/update', updateSong)
router.post('/song/delete', deleteSong)
router.post('/song/add', addSong)

router.get('/singer', getSinger)
router.post('/singer/update', updateSinger)
router.post('/singer/delete', deleteSinger)
router.post('/singer/add', addSinger)

router.get('/vocal', getVocal)
router.post('/vocal/update', updateVocal)
router.post('/vocal/delete', deleteVocal)
router.post('/vocal/add', addVocal)

router.get('/list', getEditor)
router.post('/list/update', updateEditor)
router.post('/list/delete', deleteEditor)

router.get('/comment', getComment)
router.post('/comment/update', updateComment)
router.post('/comment/delete', deleteComment)

router.get('/album', getAlbum)
router.post('/album/update', updateAlbum)
router.post('/album/delete', deleteAlbum)
router.post('/album/add', addAlbum)

router.get('/pic', getAllpic)
router.post('/pic/update', updatePic)
router.post('/pic/delete', deletePic)
router.post('/pic/add', addPic)

router.get('/video', getAllVideo)
router.post('/video/delete', deleteVideo)

router.get('/editor', getEditor)

module.exports = router