const router = require('koa-router')()
const {getPic} = require('../middleware/Weixin/Pic_middleware')
const {ReadPic} = require('../controllers/Weixin/Pic_control')

const {getSong} = require('../controllers/Weixin/Song_control')

const {getVideo} = require('../middleware/Weixin/Video_middleware')
const {ReadVideo} = require('../controllers/Weixin/Video_control')

const {getLrc} = require('../middleware/Weixin/Lrc_middleware')
const {ReadLrc} = require('../controllers/Weixin/Lrc_control')

const {getSinger, getSingerByname} = require('../controllers/Weixin/Singer_control')

const {getEditor, updateEditor, deleteEditor, addEditor} = require('../controllers/Weixin/Editor_control')

const {getComment, updateComment, deleteComment, addComment} = require('../controllers/Weixin/Comment_control')

const {getCosco, updateCosco} = require('../controllers/Weixin/Cosco_control')

const {getConcert, getConcertby} = require('../controllers/Weixin/Concert_control')

const {addUser, getUserEditor, getCommentEditor, getUserImg, getUserLike, updUserLike} = require('../controllers/Weixin/User_control')

const {SearchSinger} = require('../controllers/Search')

const {getAlbum, getAlbumSong} = require('../controllers/Weixin/Album_control')

const {Together, Delete, Listen} = require('../middleware/Weixin/Together')

router.prefix('/Wx')

router.get('/Getpic/',getPic,ReadPic)

router.get('/Getvideo/',getVideo,ReadVideo)

router.get('/Getlrc/',getLrc,ReadLrc)

router.get('/Getsong/',getSong)
router.get('/Getsinger/',getSinger)
router.get('/GetsingerByname/',getSingerByname)

router.get('/Geteditor/',getEditor)
router.post('/editor/update',updateEditor)
router.post('/editor/delete',deleteEditor)
router.post('/editor/add',addEditor)

router.get('/Getcomment/',getComment)
router.post('/comment/update',updateComment)
router.post('/comment/delete',deleteComment)
router.post('/comment/add',addComment)

router.get('/Getcosco/',getCosco)
router.post('/cosco/update',updateCosco)

router.get('/Getconcert/',getConcert)
router.get('/Getconcertbyname/',getConcertby)

router.get('/Adduser/',addUser)
router.get('/Getusereditor/',getUserEditor)
router.get('/Getusercomment/',getCommentEditor)
router.get('/Getuserimg/',getUserImg)
router.get('/GetuserLikesinger/',getUserLike)
router.get('/userLikesinger/',updUserLike)

router.get('/Getalbum',getAlbum)
router.get('/Getalbumsong',getAlbumSong)

router.get('/searchSinger/',SearchSinger)

router.get('/together/',Together)
router.get('/together/delete',Delete)
router.get('/together/listen',Listen)

module.exports = router