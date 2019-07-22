const Article = require('../models/article');

class AtricleCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const params = { title: new RegExp(ctx.query.q) };
        if (ctx.query.type) {
            params.type = ctx.query.type
        }
        ctx.body = await Article
            .find(params)
            .limit(perPage).skip(page * perPage);
    }
    async findById(ctx) {
        const article = await Article.findById(ctx.params.id).select('+content');
        if (!article) { ctx.throw(404, '文章不存在'); }
        ctx.body = article;
    }
    async create(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            cover: { type: 'string', required: true },
            type: { type: 'string', required: true },
            content: { type: 'string', required: true }
        });
        const article = await new Article(ctx.request.body).save();
        ctx.body = article;
    }
    async update(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            cover: { type: 'string', required: true },
            type: { type: 'string', required: true },
            content: { type: 'string', required: true }
        });
        const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!article) { ctx.throw(404, '文章不存在'); }
        ctx.body = ctx.request.body;
    }
    async delete(ctx) {
        const article = await Article.findByIdAndRemove(ctx.params.id);
        if (!article) { ctx.throw(404, '文章不存在'); }
        ctx.status = 204;
    }
}

module.exports = new AtricleCtl();