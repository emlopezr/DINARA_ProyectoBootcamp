import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class VerifyUpdate {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {

    const authorizationHeader = ctx.request.header('authorization')
    const idParams = ctx.params.id
    try{

      if (authorizationHeader == undefined) {
        throw new Error('No se encontró el token de autenticación.')
      }


      const userController = new UserController()
      const {id} = await userController.obtenerPayload(authorizationHeader)
      const user = await User.find(id)

      console.log(user?.role);

      const boolA: boolean = idParams != id
      const boolB: boolean = user?.role == 1

      console.log(boolA);
      console.log(boolB);


      if( boolA && !boolB){

        throw new Error('No tiene permisos para realizar esta acción')
      }
      console.log('Middleware pasado con éxito.');
      await next()
    }
    catch(error){
      console.log(error)
      return ctx.response.status(400).send({
        message: 'Token inválido',
        status: 400
      })
    }

  }
}
