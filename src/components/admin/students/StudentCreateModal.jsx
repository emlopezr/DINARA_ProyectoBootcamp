import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/admin/manageStudents/StudentFormModal.css'

const StudentCreateModal = ({ toggleModal, setChanges, isOpenModalCreate }) => {
    // Para conseguir el token de autorización
    const userData = useSelector(state => state.auth)

    // Manejo de evento de creación de estudiantes
    const [inputValues, setInputValues] = useState({
        firstName: '',
        secondName: '',
        surname: '',
        secondSurName: '',
        typeDocument: '',
        documentNumber: '',
        email: '',
        phone: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const onCreateStudent = async (e) => {
        e.preventDefault()

        // Petición POST a la Api para crear un usuario nuevo
        const createUserPOST = async (datos) => {
            const apiURL = `http://localhost:4001/api/v1/user/create`
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(datos),
            })
            const data = await response.json();

            return data
        }

        const bodyPOST = {
            firstName: inputValues.firstName,
            secondName: inputValues.secondName,
            surname: inputValues.surname,
            secondSurName: inputValues.secondSurName,
            typeDocument: parseInt(inputValues.typeDocument) || 1,
            documentNumber: parseInt(inputValues.documentNumber),
            email: inputValues?.email,
            phone: parseInt(inputValues.phone),
            role: 1,
            password: inputValues.password,
            state: true
        }

        const apiResponse = await createUserPOST(bodyPOST)

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

    // Limpiar mensaje de error en caso de que lo haya
    useEffect(() => {
        setInputValues({
            firstName: '',
            secondName: '',
            surname: '',
            secondSurName: '',
            typeDocument: '',
            documentNumber: '',
            email: '',
            phone: '',
            password: ''
        })
        setError(false)
        setMessage('')
    }, [isOpenModalCreate])


    return (
        <div className='modal-create'>

            {!error &&
                <>
                    <h3 className="modal__title">Crear un estudiante nuevo</h3>

                    <form onSubmit={onCreateStudent} className='modal__form'>

                        <div className="modal__input-group">
                            <label htmlFor="nombre1">Primer nombre</label>
                            <input
                                required
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
                                required
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
                            <label htmlFor="tipo-documento">Tipo de documento</label>
                            <select
                                required
                                name="tipo-documento"
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
                                required
                                type="number"
                                name='documento'
                                value={inputValues?.documentNumber}
                                onChange={(e) => setInputValues({ ...inputValues, documentNumber: e.target.value })}
                            />
                        </div>

                        <div className="modal__input-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                required
                                type="email"
                                name='email'
                                value={inputValues?.email}
                                onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                            />
                        </div>

                        <div className="modal__input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                required
                                type="password"
                                name='password'
                                value={inputValues?.password}
                                onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                            />
                        </div>

                        <div className="modal__input-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                required
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
                            Crear
                        </button>
                    </form>
                </>
            }

            {error &&
                <div className="modal__error">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>{message}</p>
                </div>
            }
        </div>
    )
}

export default StudentCreateModal