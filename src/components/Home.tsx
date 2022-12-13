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
        href="https://oit.williams.edu/help-guides/email/gae-set-chrome-as-email-handler"
      >
        Tutorial to set browser as email handler
      </a>
      <h2 className="h2-header">Instructions</h2>
      <p className="home-info">
        1. Create a template with desired keywords for the subject line and
        body.
      </p>
      <p className="home-info">2. Go to send emails to use the template</p>
      <p className="home-info">3. Add excel file by clicking Choose File</p>
      <p className="home-info">
        4. Make sure one of the headers is named Email to automatically get
        emails
      </p>
      <p className="home-info">
        5. Click send email to preview / generate email
      </p>
    </div>
  );
}
