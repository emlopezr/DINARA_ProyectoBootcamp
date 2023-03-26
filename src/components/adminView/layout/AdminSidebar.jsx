import React from 'react'
import '../../../styles/adminView/layout/AdminSidebar.css'

const AdminSidebar = ({ currentPage, sidebarDisplay, onChangePage }) => {

    return (
        <div className={sidebarDisplay ? 'admin-sidebar admin-sidebar--show' : 'admin-sidebar'}>
            <h1 className="admin__title" onClick={() => onChangePage('home')}>
                <i className="title__icon fa-solid fa-graduation-cap"></i>
                <p className='title__text'>DINARA</p>
            </h1>

            <ul className="sidebar__menu">
                <li className={`page__link ${(currentPage === 'home') ? 'page__link--active' : ''}`}
                    onClick={() => onChangePage('home')}
                >
                    <i className="link__icon fa-solid fa-house"></i>
                    <p className="link__text">Página principal</p>
                </li>

                <li className={`page__link ${(currentPage === 'students') ? 'page__link--active' : ''}`}
                    onClick={() => onChangePage('students')}
                >
                    <i className="link__icon fa-solid fa-users"></i>
                    <p className="link__text">Estudiantes</p>
                </li>

                <li className={`page__link ${(currentPage === 'questions') ? 'page__link--active' : ''}`}
                    onClick={() => onChangePage('questions')}
                >
                    <i className="link__icon fa-solid fa-list"></i>
                    <p className="link__text">Preguntas</p>
                </li>

                <li className={`page__link ${(currentPage === 'profile') ? 'page__link--active' : ''}`}
                    onClick={() => onChangePage('profile')}
                >
                    <i className="link__icon fa-solid fa-circle-info"></i>
                    <p className="link__text">Cuenta</p>
                </li>
            </ul>
        </div>
    )
}

export default AdminSidebar