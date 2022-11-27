import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import NewTemplate from "./components/NewTemplate";
import EmailGenerator from "./components/EmailGenerator";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email-generator" element={<EmailGenerator />} />
        <Route path="/create-template" element={<NewTemplate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
