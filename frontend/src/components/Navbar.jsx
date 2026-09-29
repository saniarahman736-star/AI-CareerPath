import {Link,useNavigate} from "react-router-dom";
import "./Navbar.css";
function Navbar(){
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };
    return(
        <nav>
            <h2>AI CareerMatch 🎯 </h2>
            <div>
                <Link to="/">Home</Link>
                {!token ?(
                 <>
                 <Link to="/register">Register</Link>
                 <Link to="/login">Login</Link>
                 </>
                    ):(
                <>
                <Link to="/aboutUs">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>
                    Logout
                </button>
                </>
                    )
                }
            </div>
        </nav>
    )
}
export default Navbar;