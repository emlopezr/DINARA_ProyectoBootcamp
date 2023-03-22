import React from 'react'
import { useSelector } from 'react-redux'
import '../../styles/AdminPage.css'

const AdminMenu = () => {
    // Sacar los datos del usuario del store de Redux
    const userData = useSelector(state => state.auth)

    return (
        <div className='admin-menu'>

            Hola {userData?.name}

        </div>
    )
}

export default AdminMenu