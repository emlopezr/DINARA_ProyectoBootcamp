import React from 'react'

const StudentItem = ({ student, toggleModalView, toggleModalEdit, setDataModal }) => {
    const {
        firstName,
        secondName,
        surname,
        secondSurName,
        documentNumber,
        email,
        phone
    } = student

    // Manejo de edición y vista
    const onViewInfo = () => {
        setDataModal(student)
        toggleModalView()
    }

    const onEditStudent = () => {
        setDataModal(student)
        toggleModalEdit()
    }

    return (
        <tr>
            <td>{firstName} {secondName} {surname} {secondSurName}</td>
            <td className='mobile-hidden'>{documentNumber}</td>
            <td className='mobile-hidden'>{email}</td>
            <td className='mobile-hidden'>{phone}</td>
            <td className="actions-column">
                <button
                    className="view-button"
                    onClick={onViewInfo}
                >
                    <i className="fa-solid fa-eye"></i>
                </button>

                <button
                    className="edit-button"
                    onClick={onEditStudent}
                >
                    <i className="fa-sharp fa-solid fa-user-pen"></i>
                </button>
            </td>
        </tr>
    )
}

export default StudentItem