import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Profile, Home, Login, Signup, CreatePost } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/CreatePost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
