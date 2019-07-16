const jwt = require('jsonwebtoken');
const Article = require('../models/article');
const { secret } = require('../config');

class AtricleCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await Article
            .find({ title: new RegExp(ctx.query.q) })
            .limit(perPage).skip(page * perPage);
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
        const populateStr = fields.split(';').filter(f => f).map(f => {
          if (f === 'employments') {
            return 'employments.company employments.job';
          }
          if (f === 'educations') {
            return 'educations.school educations.major';
          }
          return f;
        }).join(' ');
        const article = await Article.findById(ctx.params.id).select(selectFields)
          .populate(populateStr);
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