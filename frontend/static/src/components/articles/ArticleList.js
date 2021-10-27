import { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import ArticleItem from "./ArticleItem";
import { Modal, Button } from "react-bootstrap";
import gvl from "../images/gvl.jpg";
import love from "../images/love.jpg";
import shoes from "../images/shoes.jpg";
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
  const location = useLocation();
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
  }, [location]);

  return (
    <div className="container-fluid mt-5 article-container ">
      <div className="articleholder">
        {articleList?.map((article) => (
          <ArticleItem article={article} />
        ))}
      </div>
      {!props.isAuth && (
        <aside className="aside-articles container-fluid ">
          {articleList.map((article) => (
            <>
              {/* <section className="aside-title-holder">
                <h3 className="aside-title">Highlighted Article</h3>
              </section> */}
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
            </>
          ))}
          {/* <section className="aside-title-holder">
            <h3 className="aside-title">Highlighted Articles</h3>
          </section>
          <div className="content">
            <section className="blog-hero-section">
              <h4 className="article-title">
                Jeans & High Tops: Best Practices
              </h4>

              <img id="hero-img" src={shoes} alt="image-for-news-article" />
            </section>
          </div>
          <div className="content ">
            <section className="blog-hero-section">
              <h4 className="article-title">Latest Local News</h4>

              <img id="hero-img" src={gvl} alt="image-for-news-article" />
            </section>
          </div>
          <div className="content ">
            <section className="blog-hero-section">
              <h4 className="article-title">
                Words to Share: 86 Hate Movement Spreads Globally
              </h4>

              <img id="hero-img" src={love} alt="image-for-news-article" />
            </section> */}
          {/* </div> */}
        </aside>
      )}
    </div>
  );
}
export default withRouter(ArticleList);
