import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const phases = {
  drafts: "DRA",
  submitted: "SUB",
  published: "PUB",
  rejected: "REJ",
};

const categories = {
  home: "HOM",
  food: "FOO",
  fashion: "FAS",
  local: "LOC",
  global: "GLO",
};
function ArticleList(props) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const catKey = props.match.params.category;
    const key = props.match.params.phase;
    // alert(cat);

    let url = `/api_v1/articles/`;
    if (key) {
      url = `/api_v1/articles/?phase=${phases[key]}/?category=${categories[catKey]}`;
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
              <p style={{ fontStyle: "italic" }}>by {article.author}</p>
              <p className="info">{article.body}</p>
              <a
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                className="cont-button"
              >
                Continue Reading
              </a>
              <div className="bar"></div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
export default withRouter(ArticleList);
