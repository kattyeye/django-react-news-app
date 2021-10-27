import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const phases = {
  drafts: "DRA",
  submitted: "SUB",
  published: "PUB",
  rejected: "REJ",
};

function ArticleListAuth(props) {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [selection, setSelection] = useState("draftScreen");
  const location = useLocation();

  useEffect(() => {
    const key = props.match.params.phase;
    let url = `/api_v1/articles/`;
    if (key) {
      url = `/api_v1/articles/?phase=${phases[key]}`;
    }
    async function fetchArticles() {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data);
    }
    fetchArticles();
  }, [location]);

  function handleChange(e) {
    const { name, value } = e.target;
    const articlesCopy = [...articles];
    const index = articlesCopy.findIndex((article) => article.id === isEditing);

    const articleCopy = { ...articles[index] };
    articleCopy[name] = value;
    articlesCopy[index] = articleCopy;
    setArticles(articlesCopy);
  }

  let html;
  if (selection === "draftScreen") {
    html = articles.map((article) => (
      <form key={article.id}>
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
        <section className="text">
          <textarea
            type="text"
            name="body"
            value={article.body}
            onChange={handleChange}
          />
        </section>
        {article.phase === "DRA" && (
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => setIsEditing(article.id)}
          >
            Edit
          </button>
        )}

        {article.id === isEditing ? (
          <>
            <button
              className="btn btn-save save-btn"
              type="click"
              data-phase="DRA"
              onClick={handleSubmit}
            >
              Save as draft
            </button>
            <button
              className="btn btn-pub "
              type="click"
              data-phase="SUB"
              onClick={handleSubmit}
            >
              Save and submit
            </button>
          </>
        ) : null}
      </form>
    ));
  } else if (selection === "successScreen") {
    html = (
      <div className="success-card-container">
        <div className="success-card">
          <h3>Thank you for your submission! Your article is under review.</h3>
          <h4>Admin will process your request shortly.</h4>
        </div>
      </div>
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const index = articles.findIndex((article) => article.id === isEditing);
    const article = { ...articles[index] };
    const phase = e.target.dataset.phase;
    if (true) {
      delete article.image;
    }

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("phase", phase);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(
      `/api_v1/articles/${isEditing}/`,
      options
    ).catch(props.handleError);
    if (!response) {
      console.log(response);
    } else if (phase == "SUB") {
      const data = await response.json();
      const articlesCopy = [...articles];
      articlesCopy[index] = data;
      setArticles(articlesCopy);
      setSelection("successScreen");
    } else {
      const data = await response.json();
      const articlesCopy = [...articles];
      articlesCopy[index] = data;
      setArticles(articlesCopy);
    }
  }

  return (
    <div className="container-fluid mt-5 article-auth-container">
      <div className="articleholder">{html}</div>
    </div>
  );
}
export default withRouter(ArticleListAuth);
