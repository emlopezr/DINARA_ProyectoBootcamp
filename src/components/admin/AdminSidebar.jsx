import React from 'react'

const AdminSidebar = () => {
    return (
        <div className='admin-sidebar'>
            <h1 className="admin__title">
                <i className="title__icon fa-solid fa-graduation-cap"></i>
                <p className='title__text'>DINARA</p>
            </h1>

            <ul className="sidebar__menu">
                <li className="page__link page__link--active">
                    <i className="link__icon fa-solid fa-house"></i>
                    <p className="link__text">Página principal</p>
                </li>
                <li className="page__link">
                    <i className="link__icon fa-solid fa-users"></i>
                    <p className="link__text">Estudiantes</p>
                </li>
                <li className="page__link">
                    <i className="link__icon fa-solid fa-list"></i>
                    <p className="link__text">Preguntas</p>
                </li>
            </ul>
        </div>
    )
}

export default AdminSidebar