const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware')
const { create, list } = require('../controller/menu.controller')

const menuRouter = new KoaRouter({ prefix: "/menu" })

// 新增菜单/菜单列表
menuRouter.post("/", verifyAuth, create)
menuRouter.get("/", verifyAuth, list)

module.exports = menuRouter

