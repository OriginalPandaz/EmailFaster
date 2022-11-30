import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Template } from "../App";
import "../styles/EmailGenerator.css";
import readXlsxFile, { Row } from "read-excel-file";

type TemplateProps = {
  templates: Template[];
  onTemplateRemoval: (index: number) => void;
  onTemplateUpdate: (data: Template, index: number) => void;
};

export function EmailGenerator({
  templates,
  onTemplateRemoval,
  onTemplateUpdate,
}: TemplateProps) {
  const [excelData, setExcelData] = useState<Row[]>([]);
  const [index, setIndex] = useState(1);
  const [emailIndex, setEmailIndex] = useState(-1);
  const [templateKey, setTemplateKey] = useState("None");
  const [hideTemplateButtons, setTemplateButtons] = useState(false);
  const subjectLineRef = useRef<HTMLInputElement>(null);
  const bodyValue = useRef<HTMLTextAreaElement>(null);
  const hasExcelData = excelData.length == 0;

  function handleInputFile(e: React.FormEvent<HTMLInputElement>) {
    readXlsxFile(e.currentTarget.files![0])
      .then((data: Row[]) => {
        setExcelData(data);
      })
      .catch(() => {
        alert("Input file is not an excel file.");
        setExcelData([]);
      });
  }

  function handleAutoFill(e: React.FormEvent<HTMLSelectElement>) {
    let templateData = templates.find(
      (template) => template.id === e.currentTarget.value
    );
    if (templateData != null) {
      setTemplateKey(e.currentTarget.value);
      subjectLineRef.current!.value = templateData["subject"];
      bodyValue.current!.value = templateData["body"];
      setTemplateButtons(true);
    } else {
      setTemplateKey("None");
      subjectLineRef.current!.value = "";
      bodyValue.current!.value = "";
      setTemplateButtons(false);
    }
  }

  function replaceSubjectKeywords() {
    let newSubjectLine = subjectLineRef.current!.value;

    if (newSubjectLine == "") {
      return "";
    }

    for (let i = 0; i < excelData[0].length; i++) {
      if (`${excelData[0][i]}` == "Email") setEmailIndex(i);
      newSubjectLine = newSubjectLine.replaceAll(
        `{${excelData[0][i]}}`,
        `${excelData[index][i]}`
      );
    }
    return newSubjectLine;
  }

  function replaceBodyKeyWords() {
    let newBody = bodyValue.current!.value;

    if (newBody == "") {
      return "";
    }

    for (let i = 0; i < excelData[0].length; i++) {
      newBody = newBody.replaceAll(
        `{${excelData[0][i]}}`,
        `${excelData[index][i]}`
      );
    }
    return newBody;
  }

  function handleEmailGeneration() {
    let newSubjectLine = replaceSubjectKeywords();
    let newBody = replaceBodyKeyWords();
    window.open(
      `mailto:${
        excelData[index][emailIndex]
      }?subject=${newSubjectLine}&body=${encodeURIComponent(newBody)}`,
      "_blank"
    );
  }

  function handleTemplateDeletion() {
    let currTemplateIndex = templates.findIndex(
      (template) => template.id == templateKey
    );
    onTemplateRemoval(currTemplateIndex);
    setTemplateButtons(false);
    bodyValue.current!.value = "";
    subjectLineRef.current!.value = "";
  }

  function handleTemplateUpdate() {
    let currTemplateIndex = templates.findIndex(
      (template) => template.id == templateKey
    );
    let currTemplate = templates.find((template) => template.id == templateKey);
    currTemplate!.body = bodyValue.current!.value;
    currTemplate!.subject = subjectLineRef.current!.value;
    onTemplateUpdate(currTemplate!, currTemplateIndex);
  }

  return (
    <>
      <form className="form-data">
        <h1 className="header">Start off by creating a template</h1>
        <div className="header-btn">
          <button
            type="button"
            className="prev-btn"
            disabled={hasExcelData || index == 1}
            style={{
              backgroundColor:
                hasExcelData || index == 1 ? "#191919" : "#007bff",
            }}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="next-btn"
            disabled={hasExcelData || index == excelData.length}
            style={{
              backgroundColor:
                hasExcelData || index == excelData.length
                  ? "#191919"
                  : "#007bff",
            }}
            onClick={() => setIndex(index + 1)}
          >
            Next
          </button>
          <button
            type="button"
            className="send-btn"
            disabled={hasExcelData}
            style={{
              backgroundColor: hasExcelData ? "#191919" : "#007bff",
            }}
            onClick={handleEmailGeneration}
          >
            Send Email
          </button>
          <Link className="link-btn" to="/EmailFaster/create-template">
            <button className="create-template-btn">Create Template</button>
          </Link>
        </div>
        <label htmlFor="input-file">Insert Excel File</label>
        <input
          type="file"
          className="input-file"
          id="input-file"
          onChange={handleInputFile}
        ></input>
        <label htmlFor="templates">Templates</label>
        <div className="select-options">
          <select
            className="template-opts"
            name="templates"
            id="templates"
            onChange={handleAutoFill}
            defaultValue="None"
          >
            <option value="None">None</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
            ;
          </select>
          <button
            type="button"
            className="template-delete-btn"
            onClick={handleTemplateDeletion}
            hidden={!hideTemplateButtons}
          >
            Delete
          </button>
          <button
            type="button"
            className="template-update-btn"
            onClick={handleTemplateUpdate}
            hidden={!hideTemplateButtons}
          >
            Update
          </button>
        </div>
        <label htmlFor="subject">Subject</label>
        <input ref={subjectLineRef} type="text" placeholder="Subject Line" />
        <label htmlFor="body">Body</label>
        <textarea
          ref={bodyValue}
          name="body"
          id="Body"
          rows={15}
          placeholder="Don't have a template?&#10;Go create a template first!"
        ></textarea>
      </form>
    </>
  );
}
