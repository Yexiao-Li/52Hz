const Search = require('../sqlservice/Search')

const SearchSinger = async(ctx,next)=>{
    const name = ctx.query.name
    const result = await Search.getsinger(name)
    ctx.body = result
}

module.exports = {SearchSinger}