import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/authSlice'

const AdminNav = ({name}) => {
    // Usar Redux para manejar la autenticación
    const dispatch = useDispatch()

    // Manejar el evento de logout
    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='admin-nav'>
            <h1 className="nav__title">
                <i className="fa-solid fa-graduation-cap"></i>
                <p className='title__text'>DINARA</p>
            </h1>

            <div className="nav__user">
                <p className="user__name">{name}</p>
                <button className='user__button' onClick={onLogout}>
                    <i className="user__logout fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </div>
    )
}

export default AdminNav