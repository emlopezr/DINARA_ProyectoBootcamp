import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StudentPage = () => {
    // Redirigir al usuario cuando no esté logueado
    const userData = useSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.status || userData?.role !== 'student') {
            navigate('/');
        }
    }, [userData])

    return (
        <div>StudentPage</div>
    )
}

export default StudentPage