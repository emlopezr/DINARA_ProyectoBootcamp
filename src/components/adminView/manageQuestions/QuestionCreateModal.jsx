import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/adminView/manageQuestions/QuestionFormModal.css'

const QuestionCreateModal = ({ toggleModal, setChanges, isOpenModalCreate }) => {
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

    const onCreateQuestion = async (e) => {
        e.preventDefault()

        // Petición POST a la Api para crear una pregunta nueva
        const createQuestionPOST = async (datos) => {
            const apiURL = `http://localhost:4001/api/v1/questions/create`
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

        const bodyPOST = {
            question: inputValues.question,
            options: [
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
            ],
        }

        const apiResponse = await createQuestionPOST(bodyPOST)

        // Manejo del login dependiendo de la respuesta del API
        if (apiResponse?.state) {
            // Manejo si la petición fue exitosa -> Cerrar el modal
            toggleModal()
        } else {
            // Manejo de petición fallida -> Mostrar mensaje de error afuera
            const { message } = apiResponse
            setMessage(message)
            setError(true)
        }

        // Notificar cambios para que se recargue la lista
        setChanges(value => !value)
    }

    // Limpiar mensaje de error en caso de que lo haya
    useEffect(() => {
        setInputValues({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctOption: '1',
        })
        setError(false)
        setMessage('')
    }, [isOpenModalCreate])


    return (
        <div className='modal-create'>

            {!error &&
                <>
                    <h3 className="modal__title">Crear una nueva pregunta</h3>

                    <form onSubmit={onCreateQuestion} className='modal__form-questions'>

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
                            Crear
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

export default QuestionCreateModal