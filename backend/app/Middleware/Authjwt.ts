import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class Authjwt {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    try{
      if(authorizationHeader == undefined){
        throw new Error('No se encontró el token de autenticación.')
      }

    const token = authorizationHeader



      const usersController = new UsersController()
      usersController.verificarToken(token)
      await next()
    }
    catch(error){
      return ctx.response.status(401).json({message: 'Falló la autenticación del token.'})
    }
  }

}
