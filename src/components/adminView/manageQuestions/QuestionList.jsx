import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ questions, toggleModalEdit, setDataModal, setChanges, setError, setMessage, userData }) => {
    return (
        <div className='questions-list'>
            {questions.map(question => (
                <QuestionItem
                    key={question.id}
                    question={question}
                    toggleModalEdit={toggleModalEdit}
                    setDataModal={setDataModal}
                    setChanges={setChanges}
                    setError={setError}
                    setMessage={setMessage}
                    userData={userData}
                />
            ))}
        </div>
    )
}

export default QuestionList