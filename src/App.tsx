import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import { NewTemplate } from "./components/NewTemplate";
import { EmailGenerator } from "./components/EmailGenerator";
import { useLocalStorage } from "./components/useLocalStorage";

export type Template = {
  id: string;
} & TemplateData;

export type TemplateData = {
  title: string;
  subject: string;
  body: string;
};

function App() {
  const [templates, setTemplates] = useLocalStorage<Template[]>(
    "TEMPLATES",
    []
  );

  function onCreateTemplate(data: Template) {
    setTemplates((prevTemplates) => {
      return [...prevTemplates, data];
    });
  }

  function onTemplateRemoval(index: number) {
    setTemplates((prevTemplates) => {
      prevTemplates.splice(index, 1);
      return [...prevTemplates];
    });
  }

  function onTemplateUpdate(data: Template, index: number) {
    const tempTemplates = [...templates];
    tempTemplates[index] = data;
    setTemplates(tempTemplates);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/EmailFaster" element={<Home />} />
        <Route
          path="/EmailFaster/email-generator"
          element={
            <EmailGenerator
              templates={templates}
              onTemplateRemoval={onTemplateRemoval}
              onTemplateUpdate={onTemplateUpdate}
            />
          }
        />
        <Route
          path="/EmailFaster/create-template"
          element={<NewTemplate onSubmit={onCreateTemplate} />}
        />
        <Route path="*" element={<Navigate to="/EmailFaster" />} />
      </Routes>
    </>
  );
}

export default App;
