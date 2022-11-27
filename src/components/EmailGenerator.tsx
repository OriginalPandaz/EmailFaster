import { Link } from "react-router-dom";
import "../styles/EmailGenerator.css";

export default function EmailGenerator() {
  return (
    <>
      <form>
        <Link to="/create-template">
          <button>Create Template</button>
        </Link>
      </form>
    </>
  );
}
