import { FormEvent, useRef } from "react";
import { TemplateData } from "../App";
import "../styles/NewTemplate.css";

type NewTemplateProps = {
  onSubmit: (data: TemplateData) => void;
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
    });
  }

  return (
    <form className="new-template" onSubmit={handleSubmit}>
      <div className="header-buttons">
        <h1>New Template</h1>
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div>
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
        placeholder="Hello {First Name},&#10;We are here to inform you about something...&#10;Sincerely,&#10;{Owner}."
      ></textarea>
    </form>
  );
}
