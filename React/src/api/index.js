import axios from "./myAxios";
// import {LIMIT ,BLOG_LIMIT} from "../config";

// 登录请求
export const reqLogin = (admin) => axios.get(`/login/verify`,{params:{name:admin.username,password:admin.password}})

// 用户的分页请求
export const reqUser = (page) => axios(`/admin/user`)

// 更新用户
export const reqUpdateUser = (admin) => axios.post(`/admin/user/update`, {params:{id:admin.id, name:admin.name, img:null}})

// 删除用户
export const reqDeleteUser = (id) => axios.post(`/admin/user/delete`, {params:{id:id}})

//管理员的分页请求
export const reqAdmin = (page) => axios.get(`/admin/master`)

// 添加管理员
export const reqAddAdmin = (admin) => axios.post(`/admin/master/add`, {params:{name:admin.name,password:admin.password}})

// 更新管理员
export const reqUpdateAdmin = (admin) => axios.post(`/admin/master/update`, {params:{name:admin.name,password:admin.password,id:admin.id}})

// 删除管理员
export const reqDeleteAdmin = (id) => axios.post(`/admin/master/delete`, {params:{id:id}})

// 歌曲的分页请求
export const reqSong = (page) => axios(`/admin/song`)

// 添加歌曲
export const reqAddSong = (admin) => axios.post(`/admin/song/add`, {params:{name:admin.name,type:admin.type,singer:admin.singer,album:admin.album,audio:admin.audio}})

// 更新歌曲
export const reqUpdateSong = (admin) => axios.post(`/admin/song/update`, {params:{name:admin.name,type:admin.type,singer:admin.singer,album:admin.album,audio:admin.audio,id:admin.id}})

// 删除歌曲
export const reqDeleteSong = (id, name, singer) => axios.post(`/admin/song/delete`, {params:{id:id, name:name, singer:singer}})

// 歌手的分页请求
export const reqSinger = (page) => axios(`/admin/singer`)

// 添加歌手
export const reqAddSinger = (admin) => axios.post(`/admin/singer/add`, {params:{name:admin.Name,Sex:admin.Sex,Class:admin.Class,img:admin.img}})

// 更新歌手
export const reqUpdateSinger = (admin) => axios.post(`/admin/singer/update`, {params:{name:admin.Name,Sex:admin.Sex,Class:admin.Class,img:admin.img,ID:admin.ID}})

// 删除歌手
export const reqDeleteSinger = (ID) => axios.post(`/admin/singer/delete`, {params:{ID:ID}})

// 演唱会的分页请求
export const reqVocal = (page) => axios(`/admin/vocal`)

// 添加演唱会
export const reqAddVocal = (admin) => axios.post(`/admin/vocal/add`, {params:{singer:admin.singer,time:admin.Time,place:admin.place,name:admin.name,url:admin.url,introduce:admin.introduce}})

// 更新演唱会
export const reqUpdateVocal = (admin) => axios.post(`/admin/vocal/update`, {params:{singer:admin.singer,time:admin.Time,place:admin.place,name:admin.name,url:admin.url,introduce:admin.introduce,id:admin.ID}})

// 删除演唱会
export const reqDeleteVocal = (id) => axios.post(`/admin/vocal/delete`, {params:{id:id}})

// 文章的分页请求
export const reqList = (page) => axios(`/admin/list`)

// 更新文章
export const reqUpdateList = (admin) => axios.post(`/admin/list/update`, {params:{Text:admin.Text,Class:admin.Class,ID:admin.ID}})

// 删除文章
export const reqDeleteList = (id) => axios.post(`/admin/list/delete`, {params:{id:id}})

// 评论的分页请求
export const reqComment = (page) => axios(`/admin/comment`)

// 更新评论
export const reqUpdateComment = (admin) => axios.post(`/admin/comment/update`, {params:{Text:admin.Text,ID:admin.ID,textID:admin.textID}})

// 删除评论
export const reqDeleteComment = (id, textID, CommentNum) => axios.post(`/admin/comment/delete`, {params:{id:id, textID:textID, CommentNum:CommentNum}})

// 专辑的分页请求
export const reqAlbum = (page) => axios(`/admin/album`)

// 添加专辑
export const reqAddAlbum = (admin) => axios.post(`/admin/album/add`, {params:{singer:admin.singer, name:admin.name, song:admin.song, img:admin.img}})

// 更新专辑
export const reqUpdateAlbum = (admin) => axios.post(`/admin/album/update`, {params:{singer:admin.singer, name:admin.name, song:admin.song, img:admin.img, id:admin.id}})

// 删除专辑
export const reqDeleteAlbum = (id) => axios.post(`/admin/album/delete`, {params:{id:id}})

// 图片的分页请求
export const reqPic = (page) => axios(`/admin/pic`)

// 添加图片
export const reqAddPic = (admin) => axios.post(`/admin/pic/add`, {params:{name:admin.name, img:admin.img}})

// 更新图片
export const reqUpdatePic = (admin) => axios.post(`/admin/pic/update`, {params:{name:admin.name, img:admin.img}})

// 删除图片
export const reqDeletePic = (name, id) => axios.post(`/admin/pic/delete`, {params:{name:name, id:id}})

// 音乐的分页请求
export const reqVideo = (page) => axios(`/admin/video`)

// 删除音乐
export const reqDeleteVideo = (name, id, type, singer) => axios.post(`/admin/video/delete`, {params:{name:name, id:id, type:type, singer:singer}})

// 通过标题搜索资源
export const reqResourcesByTitle = (title) => axios(`/resources/${title}`)