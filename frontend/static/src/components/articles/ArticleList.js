import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ArticleItem from "./ArticleItem";
import { Modal, Button } from "react-bootstrap";
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
  travel: "TRA",
};
function ArticleList(props) {
  const [articleList, setArticleList] = useState([]);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [lgShow, setLgShow] = useState(false);
  useEffect(() => {
    const catKey = props.match.params.category;
    // const key = props.match.params.phase;
    // alert(cat);

    let url = `/api_v1/articles/`;
    if (catKey) {
      url = `/api_v1/articles/?category=${categories[catKey]}`;
      // } else if (catKey) {
      //   url = `/api_v1/articles/?phase=${categories[catKey]}`;
    }
    // alert(url);
    // } else if (catKey) {
    //   url = `/api_v1/articles/?category=${categories[catKey]}`;
    // }
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
    <div className="container-fluid mt-5 article-container">
      <div className="articleholder">
        {articleList.map((article) => (
          // <div className="content " key={article.id}>
          //   <section className="blog-hero-section">
          //     <h2 className="article-title">{article.title}</h2>
          //     {article.image && (
          //       <img
          //         id="hero-img"
          //         src={article.image}
          //         alt="image-for-news-article"
          //       />
          //     )}
          //   </section>
          //   <section className="text">
          //     <span
          //       style={{ fontStyle: "italic" }}
          //       className="author-name-text"
          //     >
          //       submitted by <strong>@{article.author}</strong>
          //     </span>
          //     {/* <br></br>
          //     <span style={{ fontStyle: "italic" }}>
          //       category: {article.category}
          //     </span> */}
          //     {/* {showArticle &&} */}
          //     <p className="info">{article.body}</p>
          //   </section>
          //   {/* <button
          //     type="button"
          //     className="btn btn-primary"
          //     data-toggle="modal"
          //     data-target="#exampleModalLong"
          //   >
          //     Read More
          //   </button> */}

          //   <button onClick={addLike} type="button" className=" btn like-btn">
          //     {likeOrLikes()}
          //   </button>
          // </div>

          <ArticleItem article={article} />
        ))}
      </div>

      <aside className="aside-articles">
        {articleList.map((article) => (
          <div className="content " key={article.id}>
            <section className="blog-hero-section">
              <h4 className="article-title">{article.title}</h4>
              {article.image && (
                <img
                  id="hero-img"
                  src={article.image}
                  alt="image-for-news-article"
                />
              )}
            </section>
          </div>
        ))}
      </aside>
    </div>
  );
}
export default withRouter(ArticleList);
