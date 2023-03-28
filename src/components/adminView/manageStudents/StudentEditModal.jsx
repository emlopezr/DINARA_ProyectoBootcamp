import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/adminView/manageStudents/StudentFormModal.css'

const StudentEditModal = ({ dataModal, toggleModal, setChanges, isOpenModalEdit }) => {
    // Para conseguir el token de autorización
    const userData = useSelector(state => state.auth)

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

    const onEditStudent = async (e, user) => {
        e.preventDefault()

        // Petición PUT a la Api para editar un usuario
        const createUserPOST = async (id, datos) => {
            const apiURL = `http://localhost:4001/api/v1/user/update/${id}`
            const response = await fetch(apiURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(datos),
            })
            const data = await response.json();

            return data
        }

        const bodyPUT = {
            firstName: inputValues.firstName,
            secondName: inputValues.secondName,
            surname: inputValues.surname,
            secondSurName: inputValues.secondSurName,
            typeDocument: parseInt(inputValues.typeDocument) || 1,
            documentNumber: parseInt(inputValues.documentNumber),
            email: inputValues?.email,
            phone: parseInt(inputValues.phone),
        }

        const apiResponse = await createUserPOST(user.id, bodyPUT)

        // Manejo del login dependiendo de la respuesta del API
        if (apiResponse?.state) {
            // Manejo si la petición fue exitosa -> Cerrar el modal
            toggleModal()
        } else {
            // Manejo de petición fallida -> Mostrar mensaje de error afuera
            const { message } = apiResponse
            setMessage(message)
            setError(true)
        }

        // Notificar cambios para que se recargue la lista
        setChanges(value => !value)
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

            <form onSubmit={(e) => onEditStudent(e, dataModal)} className='modal__form'>

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