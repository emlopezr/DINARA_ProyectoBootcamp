import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from "App/Models/Answer"
import Question from "App/Models/Question"
export default class AnswersController {

  public async createAnswer(id: number, data: any){
      await Answer.create({
        answer: data.opcion,
        is_correct: data.iscorrect,
        state: true,
        questionId: id
      })
  }

  public async getAnswers({params, response}: HttpContextContract){
    try{
      const answers = await Answer.query().select('id', 'answer').where('questionId', params.id)
      if(answers.length == 0){
        throw new Error('No se encontraron opciones')
      }

      const question = await Question.find(params.id)

      if (question?.state == false){
        throw new Error('Pregunta inactiva')
      }

      const options = answers.map((answer: any) => {
        return {
          id: answer.id,
          option: answer.answer
        }
      })

      return response.status(200).json({state: true ,message: 'Listado de opciones' ,options: options})
    }catch(error){
      return response.status(404).json({state: false ,message: 'Error al obtener el listado de opciones'})
    }

  }

  public async updateAnswer({request, response, params}: HttpContextContract){
    const data = request.only(['opcion', 'iscorrect'])

    try{
      const answer = await Answer.find(params.id)

      if(!answer){
        throw new Error('Opcion no encontrada')
      }

      answer.answer = data.opcion
      answer.is_correct = data.iscorrect
      await answer.save()
      return response.status(200).json({status: true ,message: 'opcion Editada con exito'})
    }catch(error){
      return response.status(404).json({status: false ,message: 'Error al editar la opcion'})
    }
  }




}
