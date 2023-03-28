import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from "App/Models/Form"
import Question from "App/Models/Question"
import User from 'App/Models/User'
import Answers from 'App/Models/Answer'


export default class FormsController {

  public async createForm({request, response}: HttpContextContract){
    const rawInput = request.raw()
    try{

      console.log(rawInput);

      if(!rawInput){
        throw new Error('No se recibieron datos')
      }

    const inputObject = JSON.parse(rawInput)
    const student_id = inputObject.estudianteId
    const answers = inputObject.answers

    let userExists = await User.find(student_id)
    if(!userExists){
      throw new Error('El estudiante no existe')
    }

      for await (const element of answers) {
        let answerExists = await Answers.find(element)
        if(!answerExists){
          throw new Error('No se pudieron almacenar las respuestas')
        }
        let form = await Form.create({
          student_id,
          answer_id: element,
          state: true
        })
        await form.save()
      }

      return response.status(200).json({state: true ,message: 'Respuestas almacenadas con exito'})
    }
    catch(error){
      return response.status(400).json({state: false ,message: 'No se pudieron almacenar las respuestas'})
    }
  }

  public async getForms({response}: HttpContextContract){
    try{
      let forms = await Question.query()
      .select('id', 'question')
      .where('state', true)
      .preload('answers', (query) => {
        query.select('answer', 'id', 'is_correct')
      })

      const formsArray = forms.map((form: any) => {
        return {
          question: form.question,
          id: form.id,
          options: form.answers.map((answer: any) => {
            return {
              id: answer.id,
              option: answer.answer,
              iscorrect: answer.is_correct
            }
          })
        }
      })
      return response.status(200).json({state: true ,questions: formsArray})
    }catch(error){
      console.log(error);
      return response.status(400).json({state: false ,error: 'Error al obtener el listado'})
    }
  }

}
