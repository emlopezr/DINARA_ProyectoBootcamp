import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import AnswersController from './AnswersController'

export default class QuestionsController {

  public async createQuestion({ request, response }: HttpContextContract) {
    try{
    const data = request.input('question')
    const opciones = request.input('options')

      let question = await Question.create({
        question: data,
        state: true
      })

      let answer = new AnswersController()

      opciones.forEach((element: any) => {
        answer.createAnswer(question.id, element)
      });

      return response.status(200).json({state: true ,message: 'Pregunta creada correctamente'})
    }
    catch(error){
      return response.status(400).json({state: false ,message: 'Error al crear la pregunta'})
    }
  }

  public async getQuestions({ response }: HttpContextContract) {
    try{
      let question = await Question.query().select('question', 'id').where('state', true)
      return response.status(200).json({state: true ,questions: question})
    }catch(error){
      return response.status(400).json({state: false ,message: 'Error al listar las preguntas'})
    }

  }

  public async deleteQuestion({ params, response }: HttpContextContract) {
    try{
      let question = await Question.find(params.id)
      if(!question){
        throw new Error('Pregunta no encontrada')
      }
      if(question){
        question.state = false
        await question.save()
        return response.status(200).json({state: true ,message: 'Pregunta Eliminada con exito'})
      }
    }catch(error){
      console.log(error);
      return response.status(400).json({state: false ,message: 'Error al eliminar la pregunta'})
    }
  }

  public async updateQuestion({ params, request, response }: HttpContextContract) {
    try{
      let question = await Question.find(params.id)
      if(!question){
        throw new Error('Pregunta no encontrada')
      }

      question.question = await request.input('question')
      await question.save()
      console.log('se ejecuto esta parte del codigo');
      return response.status(200).json({state: true ,message: 'Pregunta Editada con exito .'})
    }
    catch(error){
      console.log(error);
      return response.status(400).json({state: false ,message: 'Error al editar la pregunta'})
    }
  }

}
