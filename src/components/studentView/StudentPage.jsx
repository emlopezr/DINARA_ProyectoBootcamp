import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudentNav from './layout/StudentNav';
import StudentQuestions from './layout/StudentQuestions';
import '../../styles/studentView/StudentPage.css'

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
        <div className='student-page'>
            <StudentNav name={userData.name} />
            <StudentQuestions userData={userData} />
        </div>
    )
}

export default StudentPage