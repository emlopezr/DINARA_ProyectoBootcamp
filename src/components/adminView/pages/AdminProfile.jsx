import React from 'react'
import '../../../styles/adminView/pages/AdminProfile.css'

const AdminProfile = ({ userData }) => {
    return (
        <div className='admin-content-profile'>
            <h2 className="admin-content__title">Información de tu cuenta</h2>

            <div className="profile-card">
                <i className="profile__icon fa-solid fa-circle-user"></i>
                <div className="profile__info">
                    <h3 className="info__name">{userData?.name}</h3>
                    <p className="info__role">
                        <i className="fa-solid fa-crown"></i>
                        Administrador
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile