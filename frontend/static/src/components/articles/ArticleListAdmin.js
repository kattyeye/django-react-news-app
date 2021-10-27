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

function ArticleListAdmin(props) {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const key = props.match.params.phase;
    let url = `/api_v1/articles/admin/`;
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
      `/api_v1/articles/admin/${isEditing}/`,
      options
    ).catch(props.handleError);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      const articlesCopy = [...articles];
      articlesCopy[index] = data;
      setArticles(articlesCopy);
    }
  }

  const articlesHTML = articles.map((article) => (
    <form key={article.id}>
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={handleChange}
      />
      {article.phase == "SUB" && <span></span>}
      <br></br>
      <span>Phase: {article.phase}</span>
      <section className="text">
        <textarea
          type="text"
          name="body"
          value={article.body}
          onChange={handleChange}
        />
      </section>

      <button
        className="btn btn-warning"
        type="button"
        onClick={() => setIsEditing(article.id)}
      >
        Edit
      </button>

      {article.id === isEditing ? (
        <>
          <button
            type="click"
            className="btn btn-pub "
            name="SUB"
            data-phase="PUB"
            onClick={handleSubmit}
          >
            Publish
          </button>
          <button
            type="click"
            className="btn btn-danger "
            name="SUB"
            data-phase="REJ"
            onClick={handleSubmit}
          >
            Reject
          </button>
          <button
            type="click"
            className="btn btn-save "
            name="SUB"
            data-phase="ARC"
            onClick={handleSubmit}
          >
            Archive
          </button>
        </>
      ) : null}
    </form>
  ));

  return (
    <div className="container-fluid mt-5 article-auth-container">
      <div className="articleholder">{articlesHTML}</div>
    </div>
  );
}
export default withRouter(ArticleListAdmin);
