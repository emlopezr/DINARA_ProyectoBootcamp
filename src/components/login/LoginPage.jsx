import React, { useState } from 'react'
import '../../styles/loading.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [logged, setLogged] = useState(false)
    const [info, setInfo] = useState({})

    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const onSubmit = e => {
        e.preventDefault()

        // Poner el estado de carga mientras se hace la petición
        setLoading(true)

        // Hacer el POST a la API con estos datos
        const ingreso = { email, password }
        console.log("🚀 ~ file: LoginPage.jsx:14 ~ onSubmit ~ ingreso:", ingreso)

        // TODO: POST al backend con los datos de ingreso

        // Recibiremos un objeto dependiendo de si es correcto o no

        // Manejo si la petición fue exitosa
        // const { state, id, name, role, message } = {
            //     "state": true,
        //     "id": 1,
        //     "name": "Emmanuel López Rodríguez",
        //     "role": "administrador",
        //     "message": "Ingreso exitoso"
        // }
        // setInfo({ name, role, message })
        // setLogged(true)
        // TODO: Mandar al redux y el localStorage el usuario
        
        // Manejo si la petición falló
        const { state, message } = {
            "state": false,
            "message": "Contraseña o email invalido"
        }
        setInfo({ message })
        setError(true)
    }

    return (
        <div className='login-page'>

            {!logged &&

                <div className="form-block">

                    <div className="text">
                        <h1 className="text__title">
                            Bienvenido 👋
                        </h1>
                        <p className="text__subtitle">
                            Ingresa la información solicitada para entrar
                        </p>
                    </div>

                    {/* Mostrar mensaje de error al no poderse loguear */}
                    {error &&

                        <div className="alert">
                            <i className="fa-regular fa-circle-xmark"></i>
                            {info?.message}
                        </div>

                    }

                    <form
                        className="form"
                        onSubmit={onSubmit}
                    >

                        <div className="form__group">
                            <label htmlFor="email" className="form__label">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form__input"
                                placeholder='Ingresa tu correo electrónico'
                                onChange={onChangeEmail}
                                value={email}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label htmlFor="password" className="form__label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form__input"
                                placeholder='Ingresa tu contraseña'
                                minLength="6"
                                onChange={onChangePassword}
                                value={password}
                                required
                            />
                        </div>

                        {/* Uso de un loading CSS en el botón de envío y deshabilitarlo en la carga*/}
                        <button
                            type="submit"
                            className="form__button"
                            disabled={loading}
                        >
                            {!loading && 'Entrar'}
                            {loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                        </button>

                    </form>

                </div>

            }

            {logged &&

                <div className="success">
                    <h1 className="success__title">
                        {info?.message}
                    </h1>

                    <h2 className="success__subtitle">
                        {info?.name}

                        {(info?.role == 'estudiante')
                            ? <i className="fa-solid fa-graduation-cap"></i>
                            : <i className="fa-solid fa-crown"></i>
                        }
                    </h2>
                </div>

            }
        </div>
    )
}

export default LoginPage