import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Navbar,
  Profile,
  Home,
  Login,
  Signup,
  CreatePost,
  UserProfile,
} from "./components";

const Routing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/CreatePost" element={<CreatePost />} />
    </Routes>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
