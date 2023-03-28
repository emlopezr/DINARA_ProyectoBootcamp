import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/auth/authSlice'
import '../../../styles/studentView/layout/StudentNav.css'

const StudentNav = ({ name }) => {
    // Usar Redux para manejar la autenticación
    const dispatch = useDispatch()

    // Manejar el evento de logout
    const onLogout = () => dispatch(logout())

    return (
        <nav className='student-nav'>
            <h1 className="student__title">
                <i className="title__icon fa-solid fa-graduation-cap"></i>
                <p className='title__text'>DINARA</p>
            </h1>

            <div className="student-nav__user">
                <p className="student-user__name">{name}</p>
                <button className='student-user__button' onClick={onLogout}>
                    <i className="student-user__logout fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </nav>
    )
}

export default StudentNav