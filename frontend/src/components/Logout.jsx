import { Navigate } from "react-router"
import { useAuth } from "../../contextAPI/auth"
import { useEffect } from "react"

const Logout =()=> {
    const {loggout} = useAuth()

    useEffect(()=>{
        loggout()
    },[loggout])
   
    return <Navigate to="/signin"/>
}

export default Logout;
