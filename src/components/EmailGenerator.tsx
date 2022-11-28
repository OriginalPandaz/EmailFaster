import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Template } from "../App";
import "../styles/EmailGenerator.css";

type TemplateProps = {
  templates: Template[];
};

export function EmailGenerator({ templates }: TemplateProps) {
  const [subjectLine, setSubjectLine] = useState("");
  const [bodyValue, setBody] = useState("");
  const [hasTemplate, setHasTemplate] = useState(false);

  function handleAutoFill(e: React.FormEvent<HTMLSelectElement>) {
    let templateData = templates.find(
      (template) => template.id === e.currentTarget.value
    );
    if (templateData != null) {
      setHasTemplate(true);
      setSubjectLine(templateData["subject"]);
      setBody(templateData["body"]);
    } else {
      setHasTemplate(false);
      setSubjectLine("");
      setBody("");
    }
  }

  return (
    <>
      <form className="form-data">
        <div className="header-btn">
          <h1 className="header">Start off by creating a template</h1>
          <button
            type="button"
            className="prev-btn"
            disabled={!hasTemplate}
            style={{ backgroundColor: hasTemplate ? "#007bff" : "#191919" }}
          >
            Previous
          </button>
          <button
            type="button"
            className="next-btn"
            disabled={!hasTemplate}
            style={{ backgroundColor: hasTemplate ? "#007bff" : "#191919" }}
          >
            Next
          </button>
          <Link className="link-btn" to="/create-template">
            <button className="create-template-btn">Create Template</button>
          </Link>
        </div>
        <label htmlFor="templates">Templates</label>
        <select
          className="templates-opt"
          name="templates"
          id="templates"
          onChange={handleAutoFill}
        >
          <option value="None">None</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
          ;
        </select>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          placeholder="Subject Line"
          value={subjectLine}
          disabled
        />
        <label htmlFor="body">Body</label>
        <textarea value={bodyValue} name="body" id="Body" rows={15}></textarea>
      </form>
    </>
  );
}
