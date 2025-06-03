import { jwtDecode } from "jwt-decode"; 

export const useUser = ()=>{
    const token = localStorage.getItem("token")
    if(!token) return null;

    try {
        const decoded = jwtDecode(token)
        return decoded
    } catch (error) {
        return null
    }
}