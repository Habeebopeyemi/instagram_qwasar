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
  SubscribedPost,
} from "./components";

const Routing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/profile/:userid" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/CreatePost" element={<CreatePost />} />
      <Route path="/feed" element={<SubscribedPost />} />
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
