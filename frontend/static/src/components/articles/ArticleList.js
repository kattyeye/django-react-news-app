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

  const [likes, setLikes] = useState([]);

  function addLike() {
    const numLikes = likes.length + 1;
    setLikes([...likes, numLikes]);
  }

  function likeOrLikes() {
    if (likes.length === 1) {
      return likes.length + " Like";
    } else {
      return <span>{likes.length} Likes</span>;
    }
  }
  return (
    <div className="container mt-5">
      <div className="articleholder">
        {articleList.map((article) => (
          <div className="content " key={article.id}>
            <section className="blog-hero-section">
              <h2 className="article-title">{article.title}</h2>
              <img
                id="hero-img"
                src={article.image}
                alt="image-for-news-article"
              />
            </section>
            <section className="text">
              <p style={{ fontStyle: "italic" }}>by {article.author}</p>
              <p className="info">{article.body}</p>
            </section>
            <button type="button" className="btn btn-primary">
              Continue Reading
            </button>
            <button onClick={addLike} type="button" className=" btn like-btn">
              {likeOrLikes()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default withRouter(ArticleList);
