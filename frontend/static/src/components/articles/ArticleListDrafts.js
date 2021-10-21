import { useState, useEffect } from "react";
import Cookies from "js-cookie";
function ArticleListDrafts(props) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`/api_v1/articles/`);
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
      body: props.formData,
    };
    const response = await fetch("/api_v1/articles/", options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      //   props.setArticle(data);
      props.history.push("/admin");
    }
  }

  return (
    <div className="container mt-5">
      <div className="articleholder">
        <form onSubmit={submitToAdmin}>
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

                <button type="submit" className="btn btn-success">
                  Submit to Publisher
                </button>
              </section>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
export default ArticleListDrafts;
