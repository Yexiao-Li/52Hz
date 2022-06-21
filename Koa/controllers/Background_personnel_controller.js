const Background_personnel_service = require('../sqlservice/Background_personnel')

const Background_personnel_Controller = {
    async create(ctx, next){
        const user = ctx.request.body;
        console.log(user)
        // const result = await Background_personnel_service.create(user);
        ctx.body = result;
    }
}

module.exports = Background_personnel_Controller;