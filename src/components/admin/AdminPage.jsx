import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import AdminSidebar from './AdminSidebar'
import AdminHome from './AdminHome'
import AdminQuestions from './AdminQuestions'
import AdminProfile from './AdminProfile'
import AdminStudents from './students/AdminStudents'
import '../../styles/admin/AdminPage.css'

const AdminPage = () => {
    // Redirigir al usuario cuando no esté logueado
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.status || userData?.role !== 'admin') {
            navigate('/');
        }
    }, [userData])

    // Estado para manejar la página mostrada
    const [currentPage, setCurrentPage] = useState('home')

    // Estado para manejar el menú desplegable en la versión mobile
    const [sidebarDisplay, setSidebarDisplay] = useState(false)

    // Cerrar el sidebar cuando se cambia de página
    const onChangePage = (page) => {
        setCurrentPage(page)
        setSidebarDisplay(false)
    }

    return (
        <div className={sidebarDisplay ? 'admin-page admin-page--sidebar' : 'admin-page'}>
            <AdminSidebar
                currentPage={currentPage}
                sidebarDisplay={sidebarDisplay}
                onChangePage={onChangePage}
            />

            <AdminNav
                name={userData?.name}
                sidebarDisplay={sidebarDisplay}
                setSidebarDisplay={setSidebarDisplay}
                onChangePage={onChangePage}
            />

            <div className={sidebarDisplay ? 'admin-content admin-content--sidebar' : 'admin-content'}>
                {(currentPage === 'home') && <AdminHome setCurrentPage={setCurrentPage} />}
                {(currentPage === 'students') && <AdminStudents userData={userData} />}
                {(currentPage === 'questions') && <AdminQuestions />}
                {(currentPage === 'profile') && <AdminProfile userData={userData} />}
            </div>
        </div>
    )
}

export default AdminPage