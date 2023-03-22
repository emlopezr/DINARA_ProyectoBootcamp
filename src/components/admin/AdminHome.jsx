import React from 'react'

const AdminHome = ({ setCurrentPage }) => {
    return (
        <>
            <h2 className="admin-content__title">
                Página principal
            </h2>

            <div className="admin-menu-card" onClick={() => setCurrentPage('students')}>
                <i className="card__icon fa-solid fa-users"></i>
                <div className="card__info">
                    <h3 className="info__title">Administrar estudiantes</h3>
                    <p className="info__text">Consulta, crea, edita y elimina los usuarios de los estudiantes.</p>
                </div>
            </div>

            <div className="admin-menu-card" onClick={() => setCurrentPage('questions')}>
                <i className="card__icon fa-solid fa-list"></i>
                <div className="card__info">
                    <h3 className="info__title">Administrar preguntas</h3>
                    <p className="info__text">Consulta, crea, edita y elimina las preguntas y respuestas que los estudiantes deben de responder.</p>
                </div>
            </div>

            <div className="admin-menu-card" onClick={() => setCurrentPage('profile')}>
                <i className="card__icon fa-solid fa-circle-info"></i>
                <div className="card__info">
                    <h3 className="info__title">Información de tu cuenta</h3>
                    <p className="info__text">Consulta la información de tu cuenta.</p>
                </div>
            </div>
        </>
    )
}

export default AdminHome