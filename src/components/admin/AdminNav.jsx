import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/authSlice'
import '../../styles/admin/AdminNav.css'

const AdminNav = ({ name, sidebarDisplay, setSidebarDisplay, onChangePage }) => {
    // Usar Redux para manejar la autenticación
    const dispatch = useDispatch()

    // Manejar el evento de logout
    const onLogout = () => dispatch(logout())

    // Manejar el evento de desplegar u ocular la sidebar
    const onSidebar = () => setSidebarDisplay(!sidebarDisplay)

    return (
        <div className={sidebarDisplay ? 'admin-nav admin-nav--sidebar' : 'admin-nav'}>
            <i className="nav__bars fa-solid fa-bars" onClick={onSidebar}></i>

            <h1 className="admin__title admin__title--nav" onClick={() => onChangePage('home')}>
                <i className="title__icon fa-solid fa-graduation-cap"></i>
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