import React, { useEffect, useState } from 'react'
import '../../../styles/adminView/manageStudents/StudentFormModal.css'

const StudentEditModal = ({ dataModal, toggleModal, setChanges, isOpenModalEdit }) => {
    // Manejo de evento de edición
    const [inputValues, setInputValues] = useState({
        firstName: '',
        secondName: '',
        surname: '',
        secondSurName: '',
        typeDocument: '',
        documentNumber: '',
        email: '',
        phone: '',
    })

    const onEditStudent = (e) => {
        e.preventDefault()

        // TODO: Falta hacer el PUT para editar, pero no tengo ID para armar la ruta
    }

    // Limpiar los datos cada vez que se cierra el modal
    useEffect(() => {
        setInputValues({
            firstName: dataModal?.firstName || '',
            secondName: dataModal?.secondName || '',
            surname: dataModal?.surname || '',
            secondSurName: dataModal?.secondSurName || '',
            typeDocument: dataModal?.typeDocument || '',
            documentNumber: dataModal?.documentNumber || '',
            email: dataModal?.email || '',
            phone: dataModal?.phone || '',
        })
    }, [isOpenModalEdit])


    return (
        <div className='modal-edit'>
            <h3 className="modal__title">Edición de estudiante</h3>

            <form onSubmit={onEditStudent} className='modal__form'>

                <div className="modal__input-group">
                    <label htmlFor="nombre1">Primer nombre</label>
                    <input
                        type="text"
                        name='nombre1'
                        value={inputValues?.firstName}
                        onChange={(e) => setInputValues({ ...inputValues, firstName: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="nombre2">Segundo nombre</label>
                    <input
                        type="text"
                        name='nombre2'
                        value={inputValues?.secondName}
                        onChange={(e) => setInputValues({ ...inputValues, secondName: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="apellido1">Primer apellido</label>
                    <input
                        type="text"
                        name='apellido1'
                        value={inputValues?.surname}
                        onChange={(e) => setInputValues({ ...inputValues, surname: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="apellido2">Segundo apellido</label>
                    <input
                        type="text"
                        name='apellido2'
                        value={inputValues?.secondSurName}
                        onChange={(e) => setInputValues({ ...inputValues, secondSurName: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select
                        name="tipoDocumento"
                        value={inputValues?.typeDocument}
                        onChange={(e) => setInputValues({ ...inputValues, typeDocument: e.target.value })}
                    >
                        <option value="1">CC</option>
                        <option value="2">TI</option>
                        <option value="3">CE</option>
                    </select>
                </div>

                <div className="modal__input-group">
                    <label htmlFor="documento">Número de documento</label>
                    <input
                        type="number"
                        name='documento'
                        value={inputValues?.documentNumber}
                        onChange={(e) => setInputValues({ ...inputValues, documentNumber: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        name='email'
                        value={inputValues?.email}
                        onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                    />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="number"
                        name='telefono'
                        value={inputValues?.phone}
                        onChange={(e) => setInputValues({ ...inputValues, phone: e.target.value })}
                    />
                </div>

                <button
                    className='modal__submit'
                    type='submit'
                >
                    Editar
                </button>
            </form>
        </div>
    )
}

export default StudentEditModal