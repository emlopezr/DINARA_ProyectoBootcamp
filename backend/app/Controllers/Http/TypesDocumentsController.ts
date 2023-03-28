import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypesDocument from 'App/Models/TypesDocument'

export default class TypesDocumentsController {

  public async getTypesDocuments({response}: HttpContextContract){
    try{
      const typesDocuments = await  TypesDocument.query().select('id', 'name')
      return response.status(200).json({status: true ,message: 'Tipos de documentos obtenidos con exito', typesDocuments})
    }
    catch{
      return response.status(400).json({status: false ,message: 'No se pudieron obtener los tipos de documentos'})
    }
  }

  public async createTypeDocument({request, response}: HttpContextContract){

    const name = request.input('name')

    try{

      if(!name){
        throw new Error('El nombre del tipo de documento es requerido')
      }

      let typeDocument = await TypesDocument.create({
        name,
        state: true
      })
      await typeDocument.save()
      return response.status(200).json({status: true ,message: 'Tipo de documento creado con exito'})
    }
    catch{
      return response.status(400).json({status: false ,message: 'No se pudo crear el tipo de documento'})
    }
  }
}
