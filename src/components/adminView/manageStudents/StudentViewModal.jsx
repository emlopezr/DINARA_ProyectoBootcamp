import React from 'react'
import '../../../styles/adminView/manageStudents/StudentViewModal.css'

const StudentViewModal = ({ dataModal }) => {
    return (
        <div className='modal-view'>
            <i className="modal__icon fa-solid fa-circle-user"></i>
            <div className="modal__content">
                <h3 className="modal__title">
                    {dataModal?.firstName} {dataModal?.secondName} {dataModal?.surname} {dataModal?.secondSurName}
                </h3>
                <p className="info-student">
                    <span>Documento: </span>
                    {dataModal?.typeDocument == 1 && 'CC '}
                    {dataModal?.typeDocument == 2 && 'TI '}
                    {dataModal?.typeDocument == 3 && 'CE '}
                    {!dataModal?.typeDocument && 'CC '}
                    - {dataModal?.documentNumber}
                </p>
                <p className="info-student">
                    <span>Correo electrónico:</span> {dataModal?.email}
                </p>
                <p className="info-student">
                    <span>Teléfono:</span> {dataModal?.phone}
                </p>
            </div>
        </div>
    )
}

export default StudentViewModal