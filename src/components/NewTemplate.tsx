import { FormEvent, useRef } from "react";
import { Template, TemplateData } from "../App";
import "../styles/NewTemplate.css";
import { v4 as uuidV4 } from "uuid";
import { Link } from "react-router-dom";

type NewTemplateProps = {
  onSubmit: (data: Template) => void;
};

export function NewTemplate({ onSubmit }: NewTemplateProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      subject: subjectRef.current!.value,
      body: bodyRef.current!.value,
      id: uuidV4(),
    });
  }

  return (
    <form className="new-template" onSubmit={handleSubmit}>
      <h1 className="new-template-header">New Template</h1>
      <label htmlFor="title">Title</label>
      <input
        ref={titleRef}
        id="title"
        type="text"
        placeholder="Name of Template"
        required
      ></input>
      <label htmlFor="subject">Subject</label>
      <input
        ref={subjectRef}
        id="subject"
        type="text"
        placeholder="Subject Line"
        required
      ></input>
      <label htmlFor="body">Body</label>
      <textarea
        ref={bodyRef}
        name="body"
        id="body"
        rows={15}
        required
        placeholder="Hello {First Name},&#10;We are here to inform you about something...&#10;...&#10;...&#10;...&#10;Sincerely,&#10;{Owner}."
      ></textarea>
      <div className="new-temp-btns">
        <button className="save-btn">Save</button>
        <button type="button" className="cancel-btn">
          <Link to="/EmailFaster/" className="return-link">
            Cancel
          </Link>
        </button>
      </div>
    </form>
  );
}
