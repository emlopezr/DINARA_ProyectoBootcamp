import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol'

export default class RolesController {

  public async getRoleName(id_role: number){
    const role = await Rol.find(id_role)
    return role?.name
  }

  public async createRol({request, response}: HttpContextContract){
    const name = request.input('name')

    try{
      if(!name){
        throw new Error('El nombre del rol es requerido')
      }

      let role = await Rol.create({
        name,
        state: true
      })
      await role.save()
      return response.status(200).json({status: true ,message: 'Rol creado con exito'})
    }
    catch{
      return response.status(400).json({status: false ,message: 'No se pudo crear el rol'})
    }
  }

  public async getRoles({response}: HttpContextContract){
    try{
      let roles = await Rol.query()
      .select('id', 'name')
      .where('state', true)
      return response.status(200).json({status: true ,message: 'Roles obtenidos con exito', roles})
    }
    catch{
      return response.status(400).json({status: false ,message: 'No se pudieron obtener los roles'})
    }
  }

}
