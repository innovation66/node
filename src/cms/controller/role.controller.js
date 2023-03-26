const roleService = require("../service/role.service")

class RoleController {
  async create(ctx, next) {
    // 1.获取角色对象信息
    const role = ctx.request.body

    // 2.将数据插入到数据库中
    const result = await roleService.create(role)

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建角色成功~",
      data: result
    }
  }
  async remove(ctx, next) {}
  async update(ctx, next) {}
  async list(ctx, next) {
    // 1.获取角色基本信息
    const { offset = 0, size = 10 } = ctx.query
    const result = await roleService.list(Number(offset), Number(size))

    // 2.获取菜单信息
    for (const role of result) {
      const menu = await roleService.getRoleMenu(role.id)
      role.menu = menu
    }

    ctx.body = {
      code: 0,
      message: "获取角色列表~",
      data: result
    }
  }
  async detail(ctx, next) {}

  async assignMenu(ctx, next) {
    // 1.获取参数
    const roleId = ctx.params.roleId
    const menuIds = ctx.request.body.menuIds

    // 2.分配权限
    await roleService.assignMenu(roleId, menuIds)

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "分配权限成功~"
    }
  }
}

module.exports = new RoleController()
