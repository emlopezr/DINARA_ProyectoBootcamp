import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import AdminSidebar from './AdminSidebar'
import AdminHome from './AdminHome'
import AdminStudents from './AdminStudents'
import AdminQuestions from './AdminQuestions'
import '../../styles/AdminPage.css'
import AdminProfile from './AdminProfile'

const AdminPage = () => {
    // Redirigir al usuario cuando no esté logueado
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.status || userData?.role === 'estudiante') {
            navigate('/');
        }
    }, [userData])

    // Estado para manejar la página mostrada
    const [currentPage, setCurrentPage] = useState('home')

    return (
        <div className='admin-page'>
            <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <AdminNav name={userData?.name} />

            <div className="admin-content">

                {(currentPage === 'home') && <AdminHome setCurrentPage={setCurrentPage}/>}
                {(currentPage === 'students') && <AdminStudents />}
                {(currentPage === 'questions') && <AdminQuestions />}
                {(currentPage === 'profile') && <AdminProfile />}
                
            </div>

        </div>
    )
}

export default AdminPage