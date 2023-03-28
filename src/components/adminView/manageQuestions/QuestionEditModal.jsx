import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/adminView/manageQuestions/QuestionFormModal.css'

const QuestionEditModal = ({ dataModal, toggleModal, setChanges, isOpenModalEdit }) => {
    // Para conseguir el token de autorización
    const userData = useSelector(state => state.auth)

    // Manejo de evento de creación de preguntas
    const [inputValues, setInputValues] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '1',
    })
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const onEditQuestion = async (e, question) => {
        e.preventDefault()

        // TODO: Petición PUT a la Api para editar una pregunta y sus cada respuesta
        const editQuestionPUT = async (id, newName) => {
            const apiURL = `http://localhost:4001/api/v1/questions/updateQuestion/${id}`
            const response = await fetch(apiURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(newName),
            })
            const data = await response.json();
            return data
        }

        const editAnswerPUT = async (id, option) => {
            const apiURL = `http://localhost:4001/api/v1/questions/updateAnswer/${id}`
            const response = await fetch(apiURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(option),
            })
            const data = await response.json();
            return data
        }

        const bodyPUT = {
            question: inputValues.question,
        }

        const optionsPUT = [
            {
                opcion: inputValues.option1,
                iscorrect: parseInt(inputValues.correctOption) === 1,
            },
            {
                opcion: inputValues.option2,
                iscorrect: parseInt(inputValues.correctOption) === 2,
            },
            {
                opcion: inputValues.option3,
                iscorrect: parseInt(inputValues.correctOption) === 3,
            },
            {
                opcion: inputValues.option4,
                iscorrect: parseInt(inputValues.correctOption) === 4,
            },
        ]

        const apiResponse1 = await editQuestionPUT(question.id, bodyPUT)

        // Manejo del login dependiendo de la respuesta del API
        if (!apiResponse1?.state) {
            // Manejo de petición fallida -> Mostrar mensaje de error afuera
            const { message } = apiResponse1
            setMessage(message)
            setError(true)
            setChanges(value => !value)
            return
        }

        // Manejo si la petición fue exitosa -> Editar las respuestas

        for(let i=0; i < optionsPUT.length; i++) {
            const option = question.options[i]
            const apiResponse2 = await editAnswerPUT(option.id, optionsPUT[i])

            if (!apiResponse2?.status) {
                // Manejo de petición fallida -> Mostrar mensaje de error afuera
                setChanges(value => !value)
                const { message } = apiResponse2
                setMessage(message)
                setError(true)
                return
            }
        }

        
        // Notificar cambios para que se recargue la lista y cerrar modal
        setChanges(value => !value)
        toggleModal()
    }

    // Limpiar mensaje de error en caso de que lo haya
    useEffect(() => {
        setInputValues({
            question: dataModal?.question || '',
            option1: dataModal?.options?.[0]?.option || '',
            option2: dataModal?.options?.[1]?.option || '',
            option3: dataModal?.options?.[2]?.option || '',
            option4: dataModal?.options?.[3]?.option || '',
            correctOption: '1',
        })
        setError(false)
        setMessage('')
    }, [isOpenModalEdit])


    return (
        <div className='modal-create'>

            {!error &&
                <>
                    <h3 className="modal__title">Crear una nueva pregunta</h3>

                    <form onSubmit={(e) => onEditQuestion(e, dataModal)} className='modal__form-questions'>

                        <div className="modal__input-question">
                            <label htmlFor="pregunta">Pregunta</label>
                            <input
                                required
                                type="text"
                                name='pregunta'
                                value={inputValues?.question}
                                onChange={(e) => setInputValues({ ...inputValues, question: e.target.value })}
                            />
                        </div>

                        <div className="modal-group-options">
                            <div className="modal-option">
                                <label htmlFor="opcion1">a.</label>
                                <input
                                    type="radio"
                                    required
                                    name="correcta"
                                    value="1"
                                    checked={inputValues.correctOption === '1'}
                                    onChange={(e) => setInputValues({ ...inputValues, correctOption: e.target.value })}
                                ></input>
                                <input
                                    type="text"
                                    name='opcion1'
                                    value={inputValues?.option1}
                                    onChange={(e) => setInputValues({ ...inputValues, option1: e.target.value })}
                                />
                            </div>

                            <div className="modal-option">
                                <label htmlFor="opcion2">b.</label>
                                <input
                                    type="radio"
                                    required
                                    name="correcta"
                                    value="2"
                                    checked={inputValues.correctOption === '2'}
                                    onChange={(e) => setInputValues({ ...inputValues, correctOption: e.target.value })}
                                ></input>
                                <input
                                    type="text"
                                    name='opcion2'
                                    value={inputValues?.option2}
                                    checked={inputValues.correctOption === '3'}
                                    onChange={(e) => setInputValues({ ...inputValues, option2: e.target.value })}
                                />
                            </div>

                            <div className="modal-option">
                                <label htmlFor="opcion3">c.</label>
                                <input
                                    type="radio"
                                    required
                                    name="correcta"
                                    value="3"
                                    onChange={(e) => setInputValues({ ...inputValues, correctOption: e.target.value })}
                                ></input>
                                <input
                                    type="text"
                                    name='opcion3'
                                    value={inputValues?.option3}
                                    checked={inputValues.correctOption === '4'}
                                    onChange={(e) => setInputValues({ ...inputValues, option3: e.target.value })}
                                />
                            </div>

                            <div className="modal-option">
                                <label htmlFor="opcion4">d.</label>
                                <input
                                    type="radio"
                                    required
                                    name="correcta"
                                    value="4"
                                    onChange={(e) => setInputValues({ ...inputValues, correctOption: e.target.value })}
                                ></input>
                                <input
                                    type="text"
                                    name='opcion4'
                                    value={inputValues?.option4}
                                    onChange={(e) => setInputValues({ ...inputValues, option4: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            className='modal__submit'
                            type='submit'
                        >
                            Actualizar
                        </button>
                    </form>
                </>
            }

            {error &&
                <div className="modal__error">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>{message}</p>
                </div>
            }
        </div>
    )
}

export default QuestionEditModal