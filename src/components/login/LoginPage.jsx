import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'
import '../../styles/login/LoginPage.css'

const LoginPage = () => {
    // Uso de Redux para leer y guardar el estado del usuario
    const userData = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // Estados propios del login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [logged, setLogged] = useState(false)
    const [info, setInfo] = useState({})

    // Redireccionar al usuario cuando esté logueado
    const navigate = useNavigate();

    useEffect(() => {
        if (userData?.status) {
            // Conseguir el enlace al que debería ir el usuario según su rol
            const roleURL = `/${userData?.role}`
            
            if (!logged) {
                // Redireccionar al usuario automáticamente
                navigate(roleURL);
            } else {
                // Esperar 2 segundos para redireccionar al usuario
                setTimeout(() => { navigate(roleURL) }, 2000);
            }
        }
    }, [logged])

    // Manejo de eventos del formulario
    const onChangeEmail = e => setEmail(e.target.value)
    const onChangePassword = e => setPassword(e.target.value)

    const onSubmit = async e => {
        e.preventDefault()

        // Poner el estado de carga mientras se hace la petición
        setLoading(true)

        // Hacer la petición POST a la API para loguearse
        const credenciales = { email, password }

        const loginPOST = async (credenciales) => {
            const api_url = `http://localhost:4001/api/v1/login`
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenciales),
            })
            const data = await response.json();

            return data
        }

        const loginData = await loginPOST(credenciales)

        // Quitar el estado de carga
        setLoading(false)

        // Manejo del login dependiendo de la respuesta del API
        if (loginData?.state) {
            // Manejo si la petición fue exitosa -> Pantalla de bienvenida y guardar en Redux
            const { state, id, name, role, message, token } = loginData     
            setInfo({ name, role, message })
            setLogged(true)
            dispatch(login({ "status": state, id, name, role, token }))
        } else {            
            // Manejo de petición fallida -> Mostrar mensaje de error
            const { message } = loginData
            setInfo({ message })
            setError(true)
        }
    }

    // TODO: Refactorizar el render condicional, pasar las cosas a componentes independientes
    return (
        <div className='login-page'>
            <div className='login-block'>

                {/* Pantalla de formulario */}
                {!logged &&

                    <div className="form-block">

                        <div className="text">
                            <h1 className="text__title">
                                Bienvenido ;)
                            </h1>
                            <p className="text__subtitle">
                                Ingresa la información solicitada para entrar.
                            </p>
                        </div>

                        {/* Mostrar mensaje de error al no poderse loguear */}
                        {error &&

                            <div className="alert">
                                <i className="fa-solid fa-circle-xmark"></i>
                                {info?.message}
                            </div>

                        }

                        <form
                            className="form"
                            onSubmit={onSubmit}
                        >

                            <div className="form__group">
                                <label
                                    htmlFor="email"
                                    className={`form__label ${error ? 'form__label--error' : ''}`}
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`form__input ${error ? 'form__input--error' : ''}`}
                                    placeholder='Ingresa tu correo electrónico'
                                    onChange={onChangeEmail}
                                    value={email}
                                    required
                                />
                            </div>

                            <div className="form__group">
                                <label
                                    htmlFor="email"
                                    className={`form__label ${error ? 'form__label--error' : ''}`}
                                >                                Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={`form__input ${error ? 'form__input--error' : ''}`}
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

                {/* Pantalla de bienvenida */}
                {logged &&

                    <div className="success">
                        <i className="fa-regular fa-circle-check success__icon"></i>

                        <h1 className="success__title">
                            {info?.message}
                        </h1>

                        <h2 className="success__subtitle">
                            {(info?.role == 'student')
                                ? <i className="fa-solid fa-graduation-cap"></i>
                                : <i className="fa-solid fa-crown"></i>
                            }

                            {info?.name}
                        </h2>

                        {/* Spinner de carga */}
                        <span class="loader"></span>
                    </div>

                }

            </div>

            <div className="login-background"></div>
        </div>
    )
}

export default LoginPage