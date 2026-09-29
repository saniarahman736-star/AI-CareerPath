import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import Application from "./pages/Application.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App(){
  return(
  <BrowserRouter>
  <Navbar />
     <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/login" element={<Login/> }/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/application" element={<Application/>}/>
      </Routes>

  </BrowserRouter>
  );
};
export default App;