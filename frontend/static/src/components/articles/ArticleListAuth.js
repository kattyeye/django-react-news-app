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
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const key = props.match.params.phase;
    // alert(key);
    let url = `/api_v1/articles/`;
    if (key) {
      url = `/api_v1/articles/?phase=${phases[key]}`;
      // alert(url);
    }
    async function fetchArticles() {
      const response = await fetch(url);
      const data = await response.json();
      console.log("articles", data);
      setArticleList(data);
    }
    fetchArticles();
  }, []);

  async function submitToAdmin(e) {
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
        <form>
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
                <p style={{ fontStyle: "italic" }}>by {article.author}</p>
                <p className="info">{article.body}</p>

                <button
                  type="button"
                  className="btn btn-success mt-3"
                  name="DRA"
                  value="SUB"
                  onClick={submitToAdmin}
                >
                  Submit for Publishing
                </button>
              </section>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
export default withRouter(ArticleListAuth);
