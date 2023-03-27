import React from 'react'

const QuestionItem = ({ question, toggleModalEdit, setDataModal, setChanges, setError, setMessage, userData }) => {
    const { options } = question

    // Manejo de edición
    const onEditQuestion = () => {
        setDataModal(question)
        toggleModalEdit()
    }

    // Manejo de eliminación
    const onDeleteQuestion = async (id) => {
        const apiURL = `http://127.0.0.1:4001/api/v1/questions/deleteQuestion/${id}`
            const response = await fetch(apiURL, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                },
            })
            const data = await response.json();

            // Manejo de peticiones sin autorización
            if (data?.state) {
                setChanges(value => !value)
            } else {
                setError(true)
                setMessage(data?.message)
            }
    }

    return (
        <div className='question-item'>
            <div className="question__title">
                <h3>
                    {question.question}
                </h3>
            </div>

            <ol className='question__options'>
                {options.map(option => (
                    <li key={option.id}>
                        {option.option}
                    </li>
                ))}
            </ol>

            <div className="question-buttons">
                <button className="edit-question-button" onClick={onEditQuestion} >
                    <i className="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button className="delete-question-button" onClick={() => onDeleteQuestion(question.id)} >
                    <i className="fa-solid fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    )
}

export default QuestionItem