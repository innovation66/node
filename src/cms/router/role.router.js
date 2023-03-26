const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../../middleware/login.middleware')
const { create, remove, update, list, detail, assignMenu } = require('../controller/role.controller')
const roleRouter = new KoaRouter({ prefix: "/role" })

// 增删改查
roleRouter.post("/", verifyAuth, create)
roleRouter.delete("/:roleId", verifyAuth, remove)
roleRouter.patch("/:roleId", verifyAuth, update)
roleRouter.get("/", verifyAuth, list)
roleRouter.get("/:roleId", verifyAuth, detail)

// 给角色分配权限
roleRouter.post("/:roleId/menu", verifyAuth, assignMenu)

module.exports = roleRouter
