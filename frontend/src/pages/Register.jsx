import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

function Register() {
    const [showPassword,setShowPassword]=useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log("Registration data:", {
            name,
            email,
            password,
            phone
        });
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        phone,
                    }),
                }
            );

            const data = await response.json();
            console.log("Registration response:", data);
            if (!response.ok) {
                toast.error(data.message || "Registration failed");
                return;
            }

            toast.success("Registration Successful");

            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Server error. Please try again later");
        }
    };

    return (
        <div className="register-page">
        <div className="register-overlay"></div>
        <div className="register-card">
            <div className="register-logo">🎯</div>
                <h1>Create Account</h1>
            <p className="register-subtitle">
                Start your journey towards the right career
                <br/>
                Register to get started.
            </p>
        <form onSubmit={handleRegister}>
           <div className="input-group">
            <span>👤</span>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
            </div>
            <div className="input-group">
                <span>📧</span>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
            </div>
            <div className="input-group">
                <span>🔐</span>
                    <input
                        type={showPassword?"text":"password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
            <button 
            type="button"
            className="password-toggle"
            onClick={()=>setShowPassword(!showPassword)}
            >
            {showPassword ? "👁️‍🗨️":"🙈"}
            </button>
            </div>
            <div className="input-group">
                <span>📞</span>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
            </div>
            <button className="register-button" type="submit">
                    Create Account
                    <span>➜</span>
            </button>
        </form>
        <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
        </p>
    </div>
</div>
    );
}

export default Register;