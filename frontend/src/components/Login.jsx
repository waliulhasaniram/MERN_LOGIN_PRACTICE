import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../contextAPI/auth";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
    const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL

    const {storeAccessToken} = useAuth()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({email:"",password:""})

    const inputHandeler =(e)=>{
        const name = e.target.name
        const value = e.target.value 
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${api_link}/signin`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(loginData)
            })
            const res_data = await response.json()
            if(response.ok){
                //console.log(res_data.data.accessToken)
                storeAccessToken(res_data.data.accessToken)
                setLoginData({email:"",password:""})
                navigate("/")
                window.location.reload()
            }
           
        } catch (error) {
            console.log("login error ->",error)
        }
    }

 return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-12">        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
            Login to your account
        </h1>
        <form
            onSubmit={handelSubmit}
            className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl"
        >
              <Input
                    label="Email:"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={inputHandeler}
                    required
                />
                <Input
                    label="Password:"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={inputHandeler}
                    required
                />
                  <Button type="submit"> Login </Button>
        </form>

        <div className="flex space-x-4 mt-6">
            <p className="flex justify-start">Create a new account</p>  
            <NavLink to="/signup">
                <button
                    className="px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300 focus:ring-2 focus:ring-cyan-400"
                >
                    Sign up
                </button>
            </NavLink>
        </div>
    </div>
);
};

export default Login;
