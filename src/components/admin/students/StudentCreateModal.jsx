import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../../styles/admin/manageStudents/StudentFormModal.css'

const StudentCreateModal = ({ toggleModal, setChanges }) => {
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
            "firstName": inputValues?.firstName,
            "secondName": inputValues?.secondName,
            "surname": inputValues?.surname,
            "secondSurName": inputValues?.secondSurName,
            "typeDocument": parseInt(inputValues?.typeDocument),
            "documentNumber": parseInt(inputValues?.documentNumber),
            "email": inputValues?.email,
            "phone": parseInt(inputValues?.phone),
            "role": 1,
            "password": inputValues?.password,
            "state": true
        }

        const apiResponse = await createUserPOST(bodyPOST)

        // Cerrar el modal
        toggleModal()

        // // Manejo del login dependiendo de la respuesta del API
        // if (apiResponse?.state) {
        //     // Manejo si la petición fue exitosa -> Pantalla de bienvenida y guardar en Redux
        //     const { state, id, name, role, message, token } = loginData
        //     setInfo({ name, role, message })
        //     setLogged(true)
        //     dispatch(login({ "status": state, id, name, role, token }))
        // } else {
        //     // Manejo de petición fallida -> Mostrar mensaje de error
        //     const { message } = loginData
        //     setInfo({ message })
        //     setError(true)
        // }

        // Notificar cambios para que se recargue la lista
        setChanges(value => !value)
    }

    return (
        <div className='modal-create'>
            <h3 className="modal__title">Crear un estudiante nuevo</h3>

            <form onSubmit={onCreateStudent} className='modal__form'>

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
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name='password'
                        value={inputValues?.password}
                        onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
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
                    Crear
                </button>
            </form>
        </div>
    )
}

export default StudentCreateModal