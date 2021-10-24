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
    const article = articleList.find(
      (item) => item.id === parseInt(e.target.value)
    );
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(article),
    };
    const response = await fetch(
      `/api_v1/articles/${e.target.value}/`,
      options
    );
    if (!response) {
      console.log(response);
    } else {
      props.handleImage(article.image);
      const data = await response.json();
      console.log({ data });
      // setArticleList(data);
    }
  }

  const draftArticles = articleList.filter(
    (article) => article.phase === "DRA"
  );
  // const publishedArticles = articleList.filter(
  //   (article) => article.phase === "PUB"
  // );

  return (
    <div className="container mt-5">
      <div className="articleholder">
        {draftArticles?.map((article) => (
          <div className="content col-8" key={article.id}>
            <section className="blog-hero-section">
              <input value={article.title} />
              <input value={article.image} />
            </section>
            <section className="text">
              <p style={{ fontStyle: "italic" }}>
                by {article.author} <br></br> phase: {article.phase}
              </p>
              <input value={article.body} />

              <button
                type="button"
                className="btn btn-success mt-3"
                name="DRA"
                value={article.id}
                onClick={submitToAdmin}
              >
                Submit for Publishing
              </button>
            </section>
          </div>
        ))}
      </div>
      {/* <div className="articleholder">
        {publishedArticles?.map((article) => (
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
                // onClick={changeToPublished}
              >
                Publish
              </button>
              <button
                type="button"
                className="btn btn-warning mt-3"
                name="SUB"
                value="REJ"
                // onClick={changeToRejected}
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-primary mt-3"
                name="SUB"
                value="ARC"
                // onClick={changeToArchived}
              >
                Archive
              </button>
            </section>
          </div>
        ))}
      </div> */}
    </div>
  );
}
export default withRouter(ArticleListAuth);
