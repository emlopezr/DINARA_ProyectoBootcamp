import React, { useEffect, useState } from 'react'
import FormQuestion from './FormQuestion'

const StudentQuestions = ({ userData }) => {
    // Estado para guardar las preguntas recibidas o mensaje de error
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // Llamado a la API para conseguir las preguntas guardadas
    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true)

            try {
                const apiURL = `http://127.0.0.1:4001/api/v1/form/getquestions`
                const response = await fetch(apiURL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userData?.token}`
                    },
                })
                const data = await response.json();
                setLoading(false)

                // Manejo de peticiones sin autorización
                if (data?.message !== 'Falló la autenticación del token.') {
                    let { questions } = data
                    questions = questions.filter(question => question.options.length > 0)

                    setQuestions([...questions])
                } else {
                    setError(true)
                    setMessage(data?.message)
                }
            } catch {
                setLoading(false)
                setError(true)
                setMessage('Servidor desconectado')
            }
        }

        getQuestions()
    }, [])

    // Manejo del formulario para mandar las respuestas al backend
    const [formAnswers, setFormAnswers] = useState({})
    const [finished, setFinished] = useState(false)

    const onSubmitForm = async (e) => {
        e.preventDefault()

        // Petición POST a la Api para crear una pregunta nueva
        const formPOST = async (datos) => {
            const apiURL = `http://localhost:4001/api/v1/form/postquestions`
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(datos),
            })
            const data = await response.json();

            return data
        }

        // Convertir el objeto de respuestas a una lista
        const answers = Object.values(formAnswers)

        const bodyPOST = {
            estudianteId: userData.id,
            answers
        }

        // Llamado a la API y conseguir su respuesta
        const apiResponse = await formPOST(bodyPOST)

        // Manejo del login dependiendo de la respuesta del API
        if (apiResponse?.state) {
            // Manejo si la petición fue exitosa -> Mensaje de éxito
            const { message } = apiResponse
            setMessage(message)
            setFinished(true)
        } else {
            // Manejo de petición fallida -> Mensaje de error
            const { message } = apiResponse
            setMessage(message)
            setError(true)
        }
    }

    return (
        <>
            {!error && !loading && !finished && (questions.length > 0) &&
                <form className='student-form' onSubmit={onSubmitForm}>
                    {questions.map(question => (
                        <FormQuestion
                            question={question}
                            key={question.question}
                            formAnswers={formAnswers}
                            setFormAnswers={setFormAnswers}
                        />
                    ))}

                    <button
                        type='submit'
                        className="form-submit"
                    >
                        Enviar todo y terminar
                    </button>
                </form>
            }

            {!error && !loading && !finished && (questions.length === 0) &&
                <div className="student-error-alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    No hay preguntas registradas en la aplicación
                </div>
            }

            {error && !loading && !finished &&
                <div className="student-error-alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>Ha ocurrido un error:</span> "{message}", por favor reinicia tu sesión para arreglarlo
                </div>
            }

            {loading && !finished &&
                <div className="loading-state">
                    <span className="users-loader"></span>
                </div>
            }
            {finished &&
                <div className="student-finished-alert">
                    <i className="fa-solid fa-circle-check"></i>
                    {message}
                </div>
            }
        </>
    )
}

export default StudentQuestions