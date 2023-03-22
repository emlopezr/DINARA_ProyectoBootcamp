import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import '../../styles/AdminPage.css'
import AdminSidebar from './AdminSidebar'

const AdminMenu = () => {
    // Redirigir al usuario cuando no esté logueado
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.status) {
            navigate('/');
        }
    }, [userData])

    return (
        <div className='admin-page'>
            <AdminSidebar />
            <AdminNav name={userData?.name} />

            <div className="admin-content">

                <h2 className="admin-content__title">
                    Página principal
                </h2>

                {
                    // TODO: CAMBIAR LOS LOREM IPSUM */
                }

                <div className="admin-menu-card">
                    <i className="card__icon fa-solid fa-users"></i>
                    <div className="card__info">
                        <h3 className="info__title">Administrar estudiantes</h3>
                        <p className="info__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem? Vitae, earum voluptatem, modi eligendi inventore totam et reprehenderit debitis consequatur animi voluptas.</p>
                    </div>
                </div>

                <div className="admin-menu-card">
                    <i className="card__icon fa-solid fa-list"></i>
                    <div className="card__info">
                        <h3 className="info__title">Administrar preguntas</h3>
                        <p className="info__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem? Vitae, earum voluptatem, modi eligendi inventore totam et reprehenderit debitis consequatur animi voluptas.</p>
                    </div>
                </div>

                <div className="admin-menu-card">
                    <i className="card__icon fa-solid fa-circle-info"></i>
                    <div className="card__info">
                        <h3 className="info__title">Información de tu cuenta</h3>
                        <p className="info__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem? Vitae, earum voluptatem, modi eligendi inventore totam et reprehenderit debitis consequatur animi voluptas.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminMenu