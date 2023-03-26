const connection = require('../../app/database')
const menuService = require('./menu.service')

class RoleService {
  async create(role) {
    // 编写SQL语句
    const statement = `INSERT INTO role SET ?;`
    // 执行SQL语句
    const [result] = await connection.query(statement, [role])
    return result
  }

  async list(offset, size) {
    const statement = `SELECT * FROM role LIMIT ?, ?;`
    const [result] = await connection.query(statement, [offset, size])
    return result
  }

  async assignMenu(roleId, menuIds) {
    // 1.先删除之前的关系
    const deleteStatement = `DELETE FROM role_menu WHERE roleId = ?;`
    await connection.query(deleteStatement, [roleId])

    // 2.插入新的值
    const insertStatement = `INSERT INTO role_menu (roleId, menuId) VALUES (?, ?)`
    for (const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId])
    }
  }

  async getRoleMenu(roleId) {
    try {
      // 1.根据roleId获取所有的menuId
      const getMenuIdsStatement = `
        SELECT 
          rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds 
        FROM role_menu rm 
        WHERE rm.roleId = ? 
        GROUP BY rm.roleId; 
      `
      const [roleMenuIds] = await connection.query(getMenuIdsStatement, [roleId])
      const menuIds = roleMenuIds[0].menuIds

      // 2.获取完整的菜单数据
      const wholeMenu = await menuService.wholeMenu()

      // 3.从完整的菜单树中, 过滤到menuIds
      function filterMenu(menu) {
        const newMenu = []
        for (const item of menu) {
          if (item.children) {
            item.children = filterMenu(item.children)
          }
          if (menuIds.includes(item.id)) {
            newMenu.push(item)
          }
        }
        return newMenu
      }
      const finalMenu = filterMenu(wholeMenu)

      return finalMenu
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new RoleService()
