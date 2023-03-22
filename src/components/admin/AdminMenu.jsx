import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'
import '../../styles/AdminPage.css'

const AdminMenu = () => {
    // Redirigir al usuario cuando no esté logueado
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.status) {
            navigate('/login');
        }
    }, [userData])


    return (
        <div className='admin-page'>
            <AdminNav name={userData?.name}/>

        </div>
    )
}

export default AdminMenu