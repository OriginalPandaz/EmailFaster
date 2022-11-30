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
        1. Create a template with desired keywords for the subject line and
        body.
      </p>
      <p className="home-info">2. Go to send emails to use template</p>
      <p className="home-info">3. Add excel file by clicking Choose File</p>
      <p className="home-info">
        4. Use Prev and Next buttons to go through other email previews
      </p>
      <p className="home-info">
        5. Preview email to see if they are what you want and click send email
        to generate email
      </p>
    </div>
  );
}
