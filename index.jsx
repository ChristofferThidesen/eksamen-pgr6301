import * as React from "react";
import * as ReactDom from "react-dom";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const articles = [
  {
    title: "News 1",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 2",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
  {
    title: "News 3",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "05 / 04 / 2022",
  },
];

function FrontPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/articles"> Articles</Link>
        </li>

        <li>
          <Link to="/articles/new">New Articles</Link>
        </li>
      </ul>
    </div>
  );
}

function Articles() {
  return (
    <>
      {articles.map((m) => (
        <div key={m.title}>
          {" "}
          <Card style={{ width: "18rem" }}>
            <h1>Articles</h1>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>
                <>{m.title}</>
              </Card.Title>
              <Card.Text>
                <>{m.article}</>
              </Card.Text>
              <Card.Text>
                <>{m.date}</>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}

function AddArticle() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [article, setArticle] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    articles.push({ title, date, article });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Articles</h1>
      <div>
        <label>
          Title:{" "}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          date: <input value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          article:{" "}
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </label>
      </div>
      <button>Submit</button>
      <pre>{JSON.stringify({ title, date, article })}</pre>
    </form>
  );
}

function Application() {
  return (
    <>
      <BrowserRouter>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/articles/new" element={<AddArticle />} />
              <Route path="/articles" element={<Articles />} />
            </Routes>
          </Container>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

ReactDom.render(<Application />, document.getElementById("app"));
