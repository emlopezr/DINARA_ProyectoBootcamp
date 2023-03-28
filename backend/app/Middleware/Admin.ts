import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class Admin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    try{

      if (authorizationHeader == undefined) {
        throw new Error('No se encontró el token de autenticación.')
      }


      const userController = new UserController()

      const {id} = await userController.obtenerPayload(authorizationHeader)
      const user = await User.find(id)

      if(!user){
        throw new Error('No se encontró el usuario.')
      }

      if(user.role != 1){
        throw new Error('No tiene permisos para realizar esta acción.')
      }
      await next()

    }
    catch(error){
      return ctx.response.status(401).send({
        message: 'Token inválido',
        status: 401
      })
    }



  }
}
