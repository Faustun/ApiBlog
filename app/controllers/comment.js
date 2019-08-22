const Comment = require('../models/comment');

class CommentCtl {
    async find(ctx) {
        const { per_page = 50 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const { articleId } = ctx.query;
        const data = await Comment
            .find({ articleId }).sort({ _id: -1 })
            .limit(perPage).skip(page * perPage);
        ctx.body = data;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            email: { type: 'string', required: true },
            articleId: { type: 'string', required: true },
            content: { type: 'string', required: true }
        });
        console.log(ctx.request.body)
        const comment = await new Comment(ctx.request.body).save();
        ctx.body = comment;
    }
    async delete(ctx) {
        console.log(ctx.params.id)
        const comment = await Comment.findByIdAndRemove(ctx.params.id);
        if (!comment) { ctx.throw(404, '评论不存在'); }
        ctx.status = 204;
    }
}

module.exports = new CommentCtl();