import "../styles/Home.css";

export function Home() {
  return (
    <div className="container">
      <h1 className="h1-header">Welcome to EmailFaster</h1>
      <h2 className="h2-header">Get Started</h2>
      <p className="home-info">
        In order to use this application, you must set your browser's default
        email handler.
      </p>
      <p className="home-info">Follow this guide on how to do so:</p>
      <a
        className="link"
        target="_blank"
        href="https://oit.williams.edu/help-guides/email/gae-set-chrome-as-email-handler/#:~:text=Open%20Default%20Programs%20by%20clicking,Click%20OK."
      >
        Tutorial to set browser as email handler
      </a>
      <h2 className="h2-header">Instructions</h2>
      <p className="home-info">
        1. Add your excel file by clicking "Choose File".
      </p>
      <p className="home-info">
        2. Select column for email and data you want to generate
      </p>
      <p className="home-info">3. Add subject line for emails</p>
      <p className="home-info">
        4. Add template and use the data column name enclosed in {} to generate
        data in parts of the template.
      </p>
      <p className="home-info">
        5. Preview emails to see if they are what you want and click send email
        to generate email
      </p>
      <p className="home-info">
        Once you are ready, click the send emails header to start sending
        emails.
      </p>
    </div>
  );
}
