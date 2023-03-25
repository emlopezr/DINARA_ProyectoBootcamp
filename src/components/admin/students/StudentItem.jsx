import React from 'react'

const StudentItem = ({ student }) => {
    const {
        firstName,
        secondName,
        surname,
        secondSurName,
        documentNumber,
        email,
        phone
    } = student

    return (
        <tr>
            <td>{firstName} {secondName} {surname} {secondSurName}</td>
            <td className='mobile-hidden'>{documentNumber}</td>
            <td className='mobile-hidden'>{email}</td>
            <td className='mobile-hidden'>{phone}</td>
            <td className="actions-column">
                <button className="view-button">
                    <i className="fa-solid fa-eye"></i>
                </button>

                <button className="edit-button">
                    <i className="fa-sharp fa-solid fa-user-pen"></i>
                </button>
            </td>
        </tr>
    )
}

export default StudentItem