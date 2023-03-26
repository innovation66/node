const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const roleRouter = require('../cms/router/role.router')
const menuRouter = require('../cms/router/menu.router')
const registerRouters = require('../router')

// 1.创建app
const app = new Koa()

// 2.对app使用中间件
app.use(bodyParser())
registerRouters(app)

// 3.cms的路径
app.use(roleRouter.routes())
app.use(roleRouter.allowedMethods())
app.use(menuRouter.routes())
app.use(menuRouter.allowedMethods())

// 3.将app导出
module.exports = app
