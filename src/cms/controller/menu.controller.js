const menuService = require("../service/menu.service")

class MenuController {
  async create(ctx, next) {
    const menu = ctx.request.body
    console.log(menu)
    const result = await menuService.create(menu)
    ctx.body = {
      code: 0,
      message: "创建菜单成功~",
      data: result
    }
  }
  async list(ctx, next) {
    const result = await menuService.wholeMenu()
    ctx.body = {
      code: 0,
      message: "获取完整的菜单~",
      data: result
    }
  }
}

module.exports = new MenuController()
