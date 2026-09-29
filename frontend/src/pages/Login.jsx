import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import {toast} from "react-toastify";
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
        const response=await fetch("http://localhost:5000/api/auth/login",
            {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,password,
            }),
            });
        const data=await response.json();
       console.log("Login response:", data);
        if(!response.ok){
            alert(data.message || "Login failed");
            return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login Successful");
        navigate("/");
        }catch(error){
        console.error(error);
        toast.error("Server error.Please try again later");
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
            <h1>Welcome Back 👋</h1>
            <p className="login-subtitle">
                Login to continue to AI CareerMatch
            </p>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e)=>
                    setEmail(e.target.value)}
                required
                />
                <br/>
                <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)}
                required
                />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    )
}
export default Login;