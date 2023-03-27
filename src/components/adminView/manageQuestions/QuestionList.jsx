import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ questions, toggleModalEdit, setDataModal }) => {
    
    
    return (
        <div className='questions-list'>
            {questions.map(question => (
                <QuestionItem
                    key={question.id}
                    question={question}
                    toggleModalEdit={toggleModalEdit}
                    setDataModal={setDataModal}
                />
            ))}
        </div>
    )
}

export default QuestionList