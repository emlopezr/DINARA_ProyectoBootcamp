import React from 'react'

const FormQuestion = ({ question, formAnswers, setFormAnswers }) => {
    const name = question.question
    const { options } = question

    return (
        <div className='form-question'>
            <h2>{name}</h2>
            {options.map((option, i) => (
                <div className='form-option' key={option.option}>
                    <input
                        type="radio"
                        required
                        name={name}
                        value={option.id}
                        onChange={() => setFormAnswers({ ...formAnswers, [name]: option.id })}
                    />
                    <label htmlFor="name">{option.option}</label>
                </div>
            ))}
        </div>
    )
}

export default FormQuestion