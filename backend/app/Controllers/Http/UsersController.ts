import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import RolController from './RolesController'
const bcrypt = require('bcryptjs')


export default class UsersController {

  public async registerUser({ request, response }: HttpContextContract) {
    const { firstName, secondName, surname, secondSurName, documentNumber, typeDocument, email, password, phone } = request.all()
    let { rol } = request.all()
    let role = rol
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    if(Number.isNaN(role) || role == null || role == undefined){
      role = 2
    }

    try{
        let user = await User.create({
        firstName,
        secondName,
        surname,
        secondSurName,
        documentNumber,
        typeDocument,
        email,
        password: hashPassword,
        role,
        phone,
        state: true
      })
      return response.status(201).json({state: user.$attributes.state, message: 'Estudiante creado correctamente'})
    }

    catch(error){
      return response.status(400).json({state: false ,message: 'Fallo en la creación del estudiante'})
    }

  }

  public async loginUser({ request, response }: HttpContextContract) {
    const { email, password } = request.all()
    try{

      const user = await User.findBy('email', email)

      if(!user){
        console.log('Usuario no encontrado');

        throw new Error('Usuario no encontrado')
      }

      const validPassword = await bcrypt.compareSync(password, user.password)

      if(!validPassword){
        throw new Error("Contraseña incorrecta");

      }

      const payload = {
        email: user.email,
        id: user.id
      }
      const token = this.generarToken(payload)



      return response.status(200).json({
        state: true,
        id: user.id,
        name: user.firstName+ ' ' + user.secondName + ' ' + user.surname + ' ' + user.secondSurName,
        role: await new  RolController().getRoleName(user.role),
        message: 'Ingreso exitoso', token})

    }
    catch(error){
      return response.status(400).json({state: false, message: 'Error al loguear el usuario'})
    }

  }

  public  generarToken(payload: any){
    const token = jwt.sign(payload, Env.get('JWT_APP_KEY'), {
      expiresIn: "30 minutes"
    })
    return token
  }

  public verificarToken(authorizationHeader: string) {
    let token = authorizationHeader.split(' ')[1]
    jwt.verify(token, Env.get('JWT_APP_KEY'), (error: any) => {
      if(error){
        throw new Error('Token expirado')
      }
    })
    return true
  }

  public obtenerPayload(authorizationHeader: string){
    let token = authorizationHeader.split(' ')[1]
    const payload = jwt.verify(token, Env.get('JWT_APP_KEY'), {complete: true}).payload
    return payload
  }

  public async getUsers({ response }: HttpContextContract) {
    try{
      const tmp = await User.query().
        select(
          'firstName',
          'secondName',
          'surname',
          'secondSurName',
          'typeDocument',
          'documentNumber',
          'email',
          'phone',
          'role',
          'id'
          )

        const users = tmp.map((user) => {
          return {
            firstName: user.firstName,
            secondName: user.secondName,
            surname: user.surname,
            secondSurName: user.secondSurName,
            typeDocument: user.typeDocument,
            documentNumber: user.documentNumber,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id
          }
        })


      return response.status(200).json({state: true, message: "Listado de estudiantes" , users})
    }
    catch(error){
      return response.status(400).json({state: false, message: 'Fallo en el listado de estudiantes'})
    }
  }

  public async getUser({ response, params }: HttpContextContract) {
    const userExist = await User.findBy('id', params.id)
    try{
      if(!userExist){
        throw new Error('Usuario no encontrado')
      }

      const tmp = await User.query().
        select(
          'first_name',
          'second_name',
          'first_surname',
          'second_surname',
          'type_document_id',
          'document_number',
          'email',
          'phone',
          'state').
        where('id', params.id)

        const user = tmp.map((user) => {
          return {
            firstName: user.firstName,
            secondName: user.secondName,
            surname: user.surname,
            secondSurName: user.secondSurName,
            typeDocument: user.typeDocument,
            documentNumber: user.documentNumber,
            email: user.email,
            phone: user.phone
          }
        })

      return response.status(200).json(user[0])
    }
    catch(error){
      return response.status(400).json({state: false, message: 'Error al consultar el detalle del usuario'})
    }
  }

  public async updateUser({ request, response, params }: HttpContextContract) {
    const { firstName, secondName, surname, secondSurName, documentNumber, typeDocument, email, phone } = request.all()

    try{
      const user = await User.find(params.id)

      if(!user){
        throw new Error('Usuario no encontrado')
      }

      await User.query().where('id', params.id).update({
        first_name: firstName,
        second_name: secondName,
        first_surname: surname,
        second_surname: secondSurName,
        type_document_id: typeDocument,
        document_number: documentNumber,
        email: email ,
        phone: phone
      })
      return response.status(200).json({state: true, message: 'Se actualizo correctamente'})
    }
    catch(error){
      return response.status(400).json({state: false, message: 'Error al actualizar'})
    }
  }

}
