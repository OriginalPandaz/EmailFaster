import { Routes, Route, Navigate } from "react-router-dom";
import { EmailGenerator } from "./EmailGenerator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hi</h1>} />
      <Route path="/email-generator" element={<EmailGenerator />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
