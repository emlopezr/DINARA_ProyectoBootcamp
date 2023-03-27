import React from 'react'

const QuestionItem = ({ question, toggleModalEdit, setDataModal }) => {
    // La BD antes tenía preguntas sin respuesta, no tiene sentido mostrarlas
    const { options } = question

    // Manejo de edición
    const onEditQuestion = () => {
        setDataModal(question)
        toggleModalEdit()
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

            <div className="question-button">
                <button className="edit-question-button" onClick={onEditQuestion} >
                    <i className="fa-solid fa-pen-to-square"></i> Editar pregunta
                </button>
            </div>
        </div>
    )
}

export default QuestionItem