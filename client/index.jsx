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
import { useState, useEffect } from "react";

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

function ListArticles({ articleApi }) {
  const [articles, setArticles] = useState();

  useEffect(async () => {
    setArticles(undefined);
    setArticles(await articleApi.listArticels());
  }, []);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {ARTICLES.map((m) => (
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

function AddArticle({ articleApi }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [article, setArticle] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await articleApi.onAddArticle({ title, date, article });
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
    </form>
  );
}

function Application() {
  const articleApi = {
    onAddArticle: async (m) => ARTICLES.push(m),
    listArticels: async () => ARTICLES,
  };

  return (
    <>
      <BrowserRouter>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route
                path="/articles/new"
                element={<AddArticle articleApi={articleApi} />}
              />
              <Route
                path="/articles"
                element={<ListArticles articleApi={articleApi} />}
              />
            </Routes>
          </Container>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

ReactDom.render(<Application />, document.getElementById("app"));
