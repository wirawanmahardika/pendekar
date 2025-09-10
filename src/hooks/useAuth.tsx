import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) navigate('/login', {replace: true}) 
    }, [])
}

export function useAuthSuperAdmin() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if(!token || role !== "Super Admin") navigate('/login', {replace: true}) 
    }, [])
}