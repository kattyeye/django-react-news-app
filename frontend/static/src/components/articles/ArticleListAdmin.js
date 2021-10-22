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
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`/api_v1/articles/admin/`);
      const data = await response.json();
      console.log("articles", data);
      setArticleList(data);
    }
    fetchArticles();
  }, []);

  async function changeToPublished(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: articleList.article,
    };
    const response = await fetch(`/api_v1/articles/`, options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      //   props.setArticle(data);
    }
  }
  async function changeToRejected(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: articleList.article,
    };
    const response = await fetch(`/api_v1/articles/`, options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      //   props.setArticle(data);
    }
  }
  async function changeToArchived(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: articleList.article,
    };
    const response = await fetch(`/api_v1/articles/`, options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      //   props.setArticle(data);
    }
  }

  return (
    <div className="container mt-5">
      <div className="articleholder">
        {articleList.map((article) => (
          <div className="content col-8" key={article.id}>
            <section className="blog-hero-section">
              <h2>{article.title}</h2>

              <img
                id="hero-img"
                src={article.image}
                alt="image-for-news-article"
              />
            </section>
            <section className="text">
              <p style={{ fontStyle: "italic" }}>
                by {article.author} <br></br> phase: {article.phase}
              </p>
              <p className="info">{article.body}</p>

              <button
                type="button"
                className="btn btn-success mt-3"
                name="SUB"
                value="PUB"
                onClick={changeToPublished}
              >
                Publish
              </button>
              <button
                type="button"
                className="btn btn-warning mt-3"
                name="SUB"
                value="REJ"
                onClick={changeToRejected}
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-primary mt-3"
                name="SUB"
                value="ARC"
                onClick={changeToArchived}
              >
                Archive
              </button>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
export default withRouter(ArticleListAdmin);
