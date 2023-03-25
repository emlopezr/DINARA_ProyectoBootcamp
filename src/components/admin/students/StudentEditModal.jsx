import React from 'react'
import '../../../styles/admin/manageStudents/StudentEditModal.css'

const StudentEditModal = ({ dataModal }) => {

    const onEditStudent = (e) => {
        e.preventDefault()
    }

    return (
        <div className='modal-edit'>
            <h3 className="modal__title">Edición de estudiante</h3>

            <form onSubmit={onEditStudent} className='modal__form'>

                <div className="modal__input-group">
                    <label htmlFor="nombre1">Primer nombre</label>
                    <input type="text" name='nombre1' value={dataModal?.firstName} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="nombre2">Segundo nombre</label>
                    <input type="text" name='nombre2' value={dataModal?.secondName} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="apellido1">Primer apellido</label>
                    <input type="text" name='apellido1' value={dataModal?.surname} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="apellido2">Segundo apellido</label>
                    <input type="text" name='apellido2' value={dataModal?.secondSurName} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select name="tipoDocumento">
                        <option value="1" selected={(1 == dataModal?.typeDocument)}>CC</option>
                        <option value="2" selected={(2 == dataModal?.typeDocument)}>TI</option>
                        <option value="3" selected={(3 == dataModal?.typeDocument)}>CE</option>
                    </select>
                </div>

                <div className="modal__input-group">
                    <label htmlFor="documento">Número de documento</label>
                    <input type="number" name='documento' value={dataModal?.documentNumber} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" name='email' value={dataModal?.email} />
                </div>

                <div className="modal__input-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="tel" name='telefono' value={dataModal?.phone} />
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