import { Link } from "react-router-dom";
import "../styles/EmailGenerator.css";

export function EmailGenerator() {
  return (
    <>
      <form className="form-data">
        <h1>Start off by creating a template</h1>
        <Link to="/create-template">
          <button className="create-template-btn">Create Template</button>
        </Link>
        <h2>Already create templates?</h2>
        <label htmlFor="templates">Templates: </label>
        <select className="templates-opt" name="templates" id="templates">
          <option value={"None"}>None</option>
        </select>
        <br />
        <br />
      </form>
    </>
  );
}
