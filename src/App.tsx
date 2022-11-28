import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import { NewTemplate } from "./components/NewTemplate";
import { EmailGenerator } from "./components/EmailGenerator";
import { useLocalStorage } from "./components/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

export type Template = {
  id: string;
};

export type TemplateData = {
  title: string;
  subject: string;
  body: string;
};

function App() {
  const [templates, setTemplates] = useLocalStorage<TemplateData[]>(
    "TEMPLATES",
    []
  );

  function onCreateTemplate({ ...data }: TemplateData) {
    setTemplates((prevTemplates) => {
      return [...prevTemplates, { ...data, id: uuidV4() }];
    });
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email-generator" element={<EmailGenerator />} />
        <Route
          path="/create-template"
          element={<NewTemplate onSubmit={onCreateTemplate} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
