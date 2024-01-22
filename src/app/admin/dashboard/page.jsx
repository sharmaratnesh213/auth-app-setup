"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const Dashboard = () => {

    const [verified, setVerified] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        try {
            axios.get('/api/auth/logout');
            router.push('/admin/login');
            alert("You were logged out!")
        } catch (err) {
            console.log("Some error occured!")
            alert("Unable to logout, try after a minute.")
        }
    }

    useEffect(() => {

        const verifyToken = () => {
            try {
                axios.get('/api/auth/verify-token');
                alert("You are ready to get the data!");
                setVerified(true);
            } catch (error) {
                setVerified(false);
                // alert(verified);
                router.push('/admin/login');
            }
        }
        verifyToken();
    }, []);

    if (!verified) {
        return (
            <div>You are not verified to see the contents of this page!</div>
        )
    }

    return (
        <div>
            Dashboard
            <h1>Welcome Admin!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard